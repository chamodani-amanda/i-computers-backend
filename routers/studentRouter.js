import express from 'express'// express kiyn function ek import krnw.
import { createStudent, getAllStudents } from '../controllers/studentController.js'

const studentRouter = express.Router()// express.Router() kiyn function ek run krnw. me function ekk run krma, mokkheri collection ekk control krnn remote ekk hadenw me wdyt dunnm

studentRouter.get("/",getAllStudents)

studentRouter.post("/",createStudent)

export default studentRouter