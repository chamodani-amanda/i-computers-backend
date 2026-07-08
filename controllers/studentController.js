import Student from "../models/student.js";// student collection ek handle krnw. me collection ekk hadnn mehi me model ek import krnw

export function getAllStudents(req,res) {
        Student.find().then( //mekath promise ekk
            (students)=>{
                res.json(students)
            }
        );
    }
export async function getAllStudentsNew(req,res) { //async function ekk athule await ekk daai.
    try {
        const students = await Student.find() //mekath promise ekk
        res.json(students) 
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export function createStudent(req,res) {
            
            //console.log(req.user);//request ekk token ekk ekka euwoth, methanat eddi automatically user ge wisthara enter wela enne
            
            //me if part 2ka authorization part ek wee, thamant plwnd berida kiyna dewl
            if(req.user == null){ //ewana request eke user knk innw nm
                res.status(401).json({
                    message : "Unauthorized"
                })
                return
            }

            if(req.user.isAdmin == false){ //request ek ewana user admin knk newei nm
                res.status(403).json({
                    message : "Only admins can create students"
                })
                return
            }

            const newStudent = new Student(req.body)
            
            newStudent.save().then(
                ()=>{
                    res.json({
                        message : "Student added successfully"
                    })
                }
            )
        }


//mehi function godk thyn nisa export default ekk denn be, e nisa wena wenm export krnw functions