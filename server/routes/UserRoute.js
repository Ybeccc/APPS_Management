import express from "express";
// import {
//     getAllUser,
//     createUser,
//     updateUser
// } from "../controllers/User.js";

const router = express.Router()
const UserController = require('../controllers/User.js')

router.get('/user', UserController.getAllUser);
// router.post('/user', createUser);
// router.patch('/user/:id', updateUser);

export default router;