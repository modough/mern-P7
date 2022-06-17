const postModel = require("../models/post.model");
const userModel = require("../models/user.model");
const {uploadErrors} = require("../utils/error.utils");
const {promisify} = require('util');
const pipeline = promisify(require('stream').pipeline);
const objectID = require("mongoose").Types.ObjectId;
const fs = require("fs");

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
  let fileName;
  if (req.image !== null) {
    try {
      if (
        req.file.detectedMimeType !== "images/jpg" &&
        req.file.detectedMimeType !== "images/jpeg" &&
        req.file.detectedMimeType !== "images/png"
      )
        throw Error("invalid file");

      if (req.file.size > 5000000) throw Error("Max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json(errors);
    }

    fileName = req.body.userId + date.now() + ".jpg";
    console.log(req.image.stream)
    // creating image
    await pipeline(
      
      req.image.stream,
      fs.createWriteStream(`${_dirname}/../front/public/uploads/posts/${fileName}`)
    );
  }

  const newPost = new postModel({
    userId: req.body.userId,
    message: req.body.message,
    picture: req.image !== null ? "./uploads/posts/" + fileName : "",
    likers: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.updatePost = (req, res) => {
  if (!objectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);

  const updatedRecord = {
    message: req.body.message,
    picture: req.image !== null ? "./upload/posts/" + fileName : "",
  };
  postModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error :" + err);
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
