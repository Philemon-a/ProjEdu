const { register, login, logout } = require('../controllers/authController');
const { addComment, getComments } = require('../controllers/commentController');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController')
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { createProject, getProjects, updateProject, deleteProject } = require('../controllers/projectController');

const express = require('express');



const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

router.post('/createComment', addComment);
router.get('/:taskId', getComments);

router.post('/create', createTask);
router.get('/:projectId', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

router.post('/creatProject', createProject);
router.get('/getProjects', getProjects);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);



module.exports = router;