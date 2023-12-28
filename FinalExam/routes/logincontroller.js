const User = require('../model/login');

exports.login = (req, res) => {
     User.findOne({ username: req.body.username, password: req.body.password })
        .then(user => {
            if (!user) {
                return res.send('No user found.');
            }
            res.redirect('/dashboard');
        })
        .catch(err => {
            return res.send(err);
        });
};


exports.signup = (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    newUser.save()
        .then(() => {
            res.redirect('/login');
        })
        .catch((err) => {
            return res.send(err);
        });
};

exports.getAllUsers = (req, res) => {
    User.find({})
        .then(users => {
            let table = '<table><tr><th>ID</th><th>Username</th><th>Password</th><th>Update</th><th>Delete</th></tr>';
            users.forEach(user => {
                table += `<tr>
                            <td>${user._id}</td>
                            <td>${user.username}</td>
                            <td>${user.password}</td>
                            <td><button onclick="updateUser('${user._id}')">Update</button></td>
                            <td><button onclick="deleteUser('${user._id}')">Delete</button></td>
                          </tr>`;
            });
            table += '</table>';
            res.send(table);
            
        })
        .catch(err => {
            res.send(err);
        });
};

exports.updateUser = (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;

    User.findByIdAndUpdate(id, updatedData, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + id
                });
            }
            res.send(user);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + id
                });
            }
            return res.status(500).send({
                message: "Error updating user with id " + id
            });
        });
};




