// src/controllers/taskController.js
const { db } = require('../config/firebase');
const { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } = require("firebase/firestore")
require('dotenv').config();


const tasksCollection = collection(db, "tasks");

const createTask = async (req, res) => {
    const { projectId, title, description, assignee, status, dueDate } = req.body;
    try {
        const taskRef = await addDoc(tasksCollection, {
            projectId,
            title,
            description,
            assignee,
            status,
            dueDate,
            createdAt: new Date()
        });
        res.status(201).json({ id: taskRef.id });
    } catch (error) {
        res.status(400).json({ error: error.message ?? error });
    }
};

const getTasks = async (req, res) => {
    const { projectId } = req.params;
    try {
        const snapshot = await getDocs(tasksCollection, querry(where("projectId", "==", projectId)));
        const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message ?? error });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const taskRef = doc(tasksCollection, id);
        await updateDoc(taskRef, data);
        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const taskRef = doc(tasksCollection, id);
        await deleteDoc(taskRef);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
