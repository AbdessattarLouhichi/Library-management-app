import express from "express";
import passport from "passport";
import upload from '../middlewares/Upload2.js'
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.Controller.js";

const router = express.Router();

router.get('/users',passport.authenticate('bearer', {session : false}), getAllUsers);
router.get('/users/:id',passport.authenticate('bearer', {session : false}), getUser);
router.put('/users/:id',passport.authenticate('bearer', {session : false}),upload.single('photo'), updateUser);
router.delete('/users/:id',passport.authenticate('bearer', {session : false}), deleteUser)

export default router