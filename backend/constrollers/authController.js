const { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require("firebase/auth");
const { auth } = require("./config")

async function register(req, res) {
    const { email, password } = req.body;
    try {
        const data = await createUserWithEmailAndPassword(auth, email, password);
        if (data.user) res.json({ message: "User created successfully" })
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
