const { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} = require("firebase/auth");
const { collection, addDoc, getDocs } = require('firebase/firestore');
const { auth, db } = require("../config/firebase.js")
require('dotenv').config();


const usersCollection = collection(db, 'users');


const checkIfStillLoggedIn = (req, res) => {
    onAuthStateChanged(auth, (user) => {
        if (user) res.status(200).send({ user });
        else res.status(400).send({ error: "User not logged in" });
    });
};


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
        const { email, password } = req.body;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const q = query(usersCollection, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            res.status(200).send({ email: user.email, username: userDoc.data().username, userId: userDoc.id });
        } else { 
            res.status(200).send({ message: "No user found with this email" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: "Something went wrong. Please try again." });
}}

async function logout(req, res) {
    try {
        await signOut(auth);
        res.json({ message: "User logged out successfully" })
    }
    catch (error) {
        console.log(error);
        console.log('User logged out successfully');
        res.status(400).send({ error: error.message });
    }
}

module.exports = { register, login, logout };
