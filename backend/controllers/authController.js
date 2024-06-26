const { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require("firebase/auth");
const { collection, getDoc, updateDoc, doc, addDoc } = require('firebase/firestore');
const { auth, db } = require("../config/firebase")
require('dotenv').config();


const usersCollection = collection(db, 'users');

async function register(req, res) {
    const { email, password, username} = req.body;
    try {
        const data = await createUserWithEmailAndPassword(auth, email, password, username);
        const user = data.user;
        const userDoc = await addDoc(usersCollection, {
            email: email.toLowerCase(),
            username: username,
            completed_tasks: 0,
            achievements: [],
    });
    console.log(user);
    res.status(200).send({user, username, userId : userDoc.id})
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}


async function login(req, res) {
    const { email, password } = req.body;
    try {
        const data = await signInWithEmailAndPassword(auth, email, password);
        if (data.user) res.json({ message: "User logged in successfully" })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

async function logout(req, res) {
    try {
        await signOut(auth);
        res.json({ message: "User logged out successfully" })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = { register, login, logout };
