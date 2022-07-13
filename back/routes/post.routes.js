const router = require("express").Router();
const postController = require("../controllers/post.controller");
const multer = require("../middlewares/multer.middleware");
const isAdmin = require("../middlewares/admin");

//posts
router.get("/", postController.readPost);
router.post("/", multer, postController.createPost);
router.put("/:id", isAdmin, multer, postController.updatePost);
router.delete("/:id", isAdmin, postController.deletePost);

router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unlikePost);

module.exports = router;
