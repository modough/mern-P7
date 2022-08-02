const postModel = require("../models/post.model");
const userModel = require("../models/user.model");
const { uploadErrors } = require("../utils/error.utils");
const objectID = require("mongoose").Types.ObjectId;

module.exports.readPost = (req, res) => {
  postModel
    .find((err, docs) => {
      if (!err) res.send(docs);
      else console.log("Error to get data:" + err);
    })
    //voir du plus recent au plus ancien post
    .sort({ createdAt: -1 });
};

module.exports.createPost = async (req, res) => {
  const newPost = new postModel({
    userId: req.body.userId,
    message: req.body.message,
    picture: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    likers: [],
  });

  await newPost
    .save()
    .then(() => res.status(201).json({ message: "Enregistré !" }))
    .catch((err) => {
      console.log(err);
      res.status(400).json({ uploadErrors });
    });
};

module.exports.updatePost = (req, res) => {
  if (!objectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = new postModel(
    req.file
      ? {
          message: req.body.message,
          picture: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }
      : { ...req.body }
  );
  delete req.body.picture;
  const upsertData = updatedRecord.toObject();
  delete upsertData._id;

  postModel.updateOne(
    { _id: req.params.id },
    upsertData,
    { upsert: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
};

module.exports.deletePost = (req, res) => {
  if (!objectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);
  postModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error :" + err);
  });
};

module.exports.likePost = async (req, res) => {
  if (!objectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);

  try {
    await postModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      {
        new: true,
      },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    await userModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      {
        new: true,
      },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.unlikePost = async (req, res) => {
  if (!objectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);

  try {
    await postModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      {
        new: true,
      },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    await userModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      {
        new: true,
      },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
