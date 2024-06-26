// src/controllers/projectController.js
const { db } = require('../config/firebase');
const { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } = require("firebase/firestore")
require('dotenv').config();


const projectsCollection = collection(db, "projects");

const createProject = async (req, res) => {
  const { name, description, members } = req.body;
  try {
    const projectRef = await addDoc(projectsCollection, {
      name,
      description,
      members,
      createdAt: new Date()
    })
    res.status(201).json({ id: projectRef.id });
  } catch (error) {
    res.status(400).json({ error: error.message ?? error });

  }
};

const getProjects = async (req, res) => {
  try {
    const results = await getDocs(projectsCollection)
    const projects = results.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProject = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const projectRef = doc(projectsCollection, id)
    await updateDoc(projectRef, data)
    res.status(200).json({ message: 'Project updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const projectRef = doc(projectsCollection, id)
    await deleteDoc(projectRef)
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createProject, getProjects, updateProject, deleteProject };
