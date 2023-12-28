const User = require('../model/User');
const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
require('dotenv').config();

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if(!users ) {
            return res.status(400).json({ message: 'No users found' });
        }
        return res.status(200).json({ users });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }

    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword , blogs:[]});

    try {
        await user.save();
    } catch (error) {
        return res.status(500).json({ message: 'Could not save user' });
    }

    res.status(201).json({ user });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }

    if (!existingUser) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    let passwordIsValid;
    try {
        passwordIsValid = await bcrypt.compare(password, existingUser.password);
    } catch (error) {
        return res.status(500).json({ message: 'Could not log in' });
    }

    if (!passwordIsValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "3h" });

    res.status(200).json({ message: 'Log in successful', user: existingUser, token });
}

module.exports = {getAllUsers , signup , login};