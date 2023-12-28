const Blog = require("../model/Blog");
const User = require("../model/User");
const multer = require("multer");

const mongoose = require("mongoose");

// get all blogs
const getAllBlogs = async (req, res) => {
  let blogs;
  try {
    blogs = await Blog.find().populate("user");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!blogs) {
    return res.status(400).json({ message: "No blogs found" });
  }
  return res.status(200).json({ blogs });
};

// add a blog

const addBlog = async (req, res) => {
  const { title, description, image, user } = req.body;
  let blog;
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  if (!existingUser) {
    return res.status(400).json({ message: "User does not exist" });
  }
  const newBlog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
    // blog = await Blog.create({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session: session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session: session });
    await session.commitTransaction();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  
  return res.status(200).json(newBlog);
};

// update a blog
const updateBlog = async (req, res) => {
  const { title, description } = req.body;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(req.params.id, { title, description });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  if (!blog) {
    return res.status(400).json({ message: "Unable to update the blog" });
  }
  return res.status(200).json({ blog });
};

// get a blog by id

const getById = async (req, res) => {
  let blog;
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid blog ID" });
  }

  try {
    blog = await Blog.findById(id);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!blog) {
    return res.status(404).json({ message: "No blog found" });
  }

  return res.status(200).json({ blog });
};

// delete a blog
const deleteBlog = async (req, res) => {
  let blog;
  try {
    blog = await Blog.findById(req.params.id).populate("user");
    if (!blog) {
      return res.status(400).json({ message: "No blog found" });
    }
    await blog.user.blogs.pull(blog._id);
    await blog.user.save();
    await Blog.findByIdAndDelete(req.params.id);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  return res.status(200).json({ message: "Blog deleted successfully" });
};

// get the blogs by user id
const getByUserId = async (req, res) => {
  let userId = req.params.id;
  let Userblogs;
  const page = parseInt(req.query.page) || 1; 
  const limit = 4; 
  const skip = (page - 1) * limit;

  try {
    Userblogs = await User.findById(userId)
      .populate({
        path: 'blogs',
        options: {
          skip: skip,
          limit: limit
        }
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  if (!Userblogs) {
    return res.status(400).json({ message: "No blogs found" });
  }
  return res.status(200).json({ user: Userblogs });
};

//  Blogs likes and dislikes

const likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog.likes.includes(req.body.userId)) {
      await blog.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The blog has been liked");
    } else {
      await blog.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The blog has been disliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllBlogs,
  addBlog,
  updateBlog,
  getById,
  deleteBlog,
  getByUserId,
  likeBlog,
};
