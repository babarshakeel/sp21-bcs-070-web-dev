const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  addBlog,
  updateBlog,
  getById,
  deleteBlog,
  getByUserId,
  likeBlog,
} = require("../controllers/blogcontroller");
const { authenticateToken } = require("../middleware/authMiddleware");

router.get("/", getAllBlogs);
router.post("/add", authenticateToken, addBlog);
router.put("/update/:id", updateBlog);
router.get("/:id", getById);
router.delete("/:id", deleteBlog);
router.get("/user/:id", getByUserId);
router.put("/:id/like", likeBlog);

module.exports = router;
