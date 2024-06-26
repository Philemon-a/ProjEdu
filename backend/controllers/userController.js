const { db } = require('../config/firebase');
const { collection, getDoc, updateDoc, doc } = require('firebase/firestore');
require('dotenv').config();


const usersCollection = collection(db, 'users');

const getUserProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const userDoc = await getDoc(usersCollection, userId);
    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(userDoc.data());
  } catch (error) {
    res.status(400).json({ error: error.message ?? error});
  }
};

const updateUserProfile = async (req, res) => {
  const { userId } = req.params;
  const data = req.body;
  try {
    userRef = doc(usersCollection, userId);
    await updateDoc(userRef, data);
    res.status(200).json({ message: 'User profile updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getUserProfile, updateUserProfile };
