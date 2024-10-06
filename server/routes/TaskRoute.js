import express from "express";
import {
    getAllTask
} from "../controllers/ManajemenTugas";

const router = express.Router()

router.get('/users.task', getAllTask);

export default router;