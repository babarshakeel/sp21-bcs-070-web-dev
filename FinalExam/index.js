const express = require('express');
const connectDB = require('./config');
const router = express.Router();
const loginController = require('./routes/logincontroller');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const ValidateUser = require('./middleware');

connectDB();
app.use(express.json({extended: false}));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.render('signup')
})

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

router.post('/login', ValidateUser ,loginController.login);
router.post('/signup',ValidateUser ,loginController.signup);
router.get('/users', loginController.getAllUsers);

app.use(router);

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})  