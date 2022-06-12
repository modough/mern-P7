const userModel = require("../models/user.model");
const objectID = require("mongoose").Types.ObjectId;

// display all users
module.exports.getAllUsers = async (req, res, next) => {
  // display  everything in the model except the password
  const users = await userModel.find().select("-password");
  res.status(200).json(users);
};

// display user
module.exports.userInfo = (req, res, next) => {
  // on verifie si l' ID est valid
  if (!objectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);

  userModel
    .findById(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log("ID unknown :" + err);
    })
    .select("-password");
};

// update user
module.exports.updateUser = async (req, res, next) => {
  if (!objectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);

  try {
    await userModel.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

// delete user
module.exports.deleteUser = async (req, res, next) => {
  if (!objectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);

  try {
    await userModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted." });
  } catch (err) {
    return res.json({ message: err });
  }
};

// follow user
/*module.exports.follow = async (req, res, next) => {
  // on verifie si l' ID est valid
  if (
    !objectID.isValid(req.params.id) ||
    !objectID.isValid(req.body.idToFollow)
  )
    return res.status(400).send("ID unknown :" + req.params.id);

  try {
    // add to followers list with $addToSet
    await userModel.findByIdAndUpdate(
      req.params.id,
      {$addToSet: {following: req.body.idToFollow}},
      {new: true, upsert: true},
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json(err);
      }
    );

    // add to following list
    await userModel.findByIdAndUpdate(
      req.body.idToFollow,
      {$addToSet: {followers: req.params.id}},
      {new: true, upsert: true},
      (err, docs) => {
        if (err) return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};


// unfollow user
module.exports.unfollow = async (req, res, next) => {
    // on verifie si l' ID est valid
    if (
      !objectID.isValid(req.params.id) ||
      !objectID.isValid(req.body.idToUnfollow)
    )
      return res.status(400).send("ID unknown :" + req.params.id);
  
    try {
      // add to followers list with $pull
      await userModel.findByIdAndUpdate(
        req.params.id,
        { $pull: { following: req.body.idToUnfollow } },
        { new: true, upsert: true },
        (err, docs) => {
          if (!err) res.status(201).json(docs);
          else return res.status(400).json(err);
        }
      );
      await userModel.findByIdAndUpdate(
        req.body.idToUnfollow,
        { $pull: { followers: req.params.id } },
        { new: true, upsert: true },
        (err, docs) => {
          if (err) return res.status(400).json(err);
        }
      );
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  };*/
  