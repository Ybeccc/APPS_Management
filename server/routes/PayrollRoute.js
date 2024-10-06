import express from "express";
import {
    getAllPayroll,
    createPayroll,
    updatePayroll,
    deletePayroll

} from "../controllers/Penggajian";

const router = express.Router()

router.get('/users.payroll', getAllPayroll);
router.post('/users.payroll', createPayroll);
router.patch('/users.payroll', updatePayroll);
router.delete('/users.payroll', deletePayroll);

export default router;