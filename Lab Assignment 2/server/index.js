const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/userroutes");
const blogRoutes = require("./routes/blogroutes");
const path = require("path");

const Blog = require("./model/Blog");
const User = require("./model/User");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const connectDB = require("./config/db");
connectDB();

app.get("/login", function (req, res) {
  res.render("partials/login");
});

app.post("/login", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const adminUsername = "admin"; 
  const adminPassword = "password"; 

  if (username === adminUsername && password === adminPassword) {
   
    const users = await User.find({}).populate('blogs');

    res.render("partials/dashboard", { users});
  } else {
    res.send("Invalid username or password");
  }
});



app.get('/search', async function(req, res) {
  const query = req.query.query;

  try {
    const users = await User.find({ name: new RegExp(query, 'i') }).populate('blogs');

    const blogs = users.reduce((allBlogs, user) => allBlogs.concat(user.blogs), []);
    res.render('partials/dashboard', { users: users, blogs: blogs });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
const port = 5000;

app.use("/api/users", userRoutes);
app.use("/api/blog", blogRoutes);

app.listen(port, () => console.log(`App listening on port ${port}!`));
