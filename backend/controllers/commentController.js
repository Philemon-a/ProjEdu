const { db } = require('../config/firebase');
const { collection, addDoc, getDocs } = require("firebase/firestore")
require('dotenv').config();


const commentCollection = collection(db, "comments");

const addComment = async (req, res) => {
    const { taskId, userId, content } = req.body;
    try {
        const commentRef = await addDoc({
            taskId,
            userId,
            content,
            createdAt: new Date()
        });
        res.status(201).json({ id: commentRef.id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getComments = async (req, res) => {
    const { taskId } = req.params;
    try {
        const snapshot = await getDocs(commentCollection, querry(where('taskId', '==', taskId)));
        const comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({
            error: error.message ??
                error
        });
    }
};

module.exports = { addComment, getComments };
