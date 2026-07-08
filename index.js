import express from 'express'// express kiyn function ek import krnw.
import mongoose from 'mongoose'// mongoose kiyn function ek import krnw. me function ek mongodb database ekta sambanda wenna udau karai
import studentRouter from './routers/studentRouter.js' 
import userRouter from './routers/userRouter.js'
import authenticate from './middlewares/authenticate.js'
import productRouter from './routers/productRouter.js'
import dotenv from 'dotenv' //dotenv kiyn function ek import krnw. me function ek .env file ek wge thyna variable tika read krnw udau karai

dotenv.config()//mehidi folder eke.env kiyl file ekk thynw nm eke thyna variables mekt load wei


const mongoDBURL = process.env.MONGO_URI //mongodb database eke url eka thyna variable ekk, me variable eka .env file ek wge thyna. me variable eka read krnw udau krnw dotenv function ek

mongoose.connect(mongoDBURL).then( //mongodb ekt connect krl denn kiyn de meyin kiyai, meya poronduwak wge
    //MEYA internet ekharaha sidu we, emnisa podihri delay ekk thiynn plwn, errord siduwiy heka
    //mongoose kiynne mongodb database ekta sambanda wenna udau karana function ek. me function ekta mongoDBURL kiyn variable eka danna one, 
    // eya mongodb database eke url eka thiyena variable ekk
    () => {
    console.log('Connected to MongoDB successfully ') //hryt mongodb connect unth meya print wei
   }
)  
.catch((error) => {
    console.log("MongoDB connection failed");
    console.log(error.message);
  });

const app = express()  //let kiynne variable ekk hdgnn eka.me express ek thniyama internet ek haraha sambanda wenn plwn run wenn plwn backend software ekaki
                     //wenas wen nthi me wge variable wge ewat "const" use 


app.use(express.json())// p2)*  me middleware ek plug kra atha

app.use(authenticate)//token ekk awata psse ek check krnw harid kiyl, boru nm "nextkrn na"
                    //token ekk thynw nm eke thyna aththa wisthare dala itpsse thyna ewt ewai


app.use("/students", studentRouter) //studentRouter kiynne router ekk, me router ekk hadnn mehi me model ek import krnw. me router ekk use krnn plwn,
// eya "/students" kiyn path ek wge, e path ek wge request awoth me router ekk handle krnne kiyl meya poronduwak wge

app.use("/users", userRouter) //userRouter kiynne router ekk, me router ekk hadnn mehi me model ek import krnw. me router ekk use krnn plwn,

app.use("/products", productRouter) //productRouter kiynne router ekk, me router ekk hadnn mehi me model ek import krnw. me router ekk use krnn plwn,
// app.get("/",
//     (req,res)=>{ //input variable 2k(res -> request ek adala kent button ekk click kirimen nknma yai, adala kenata ywna rocket ekk wge)
//         ///console.log(req)        // request eke wisthra tika req wla atha. size ek wge atha
       
//         Student.find().then( //database eken data argen ewa print krgenima mehidi krai
//             (students)=>{
//                 res.json(students) //database eke thyna data tika json wge response ekk widiyata print krgenima mehidi krai
//             }
//         )
//     }
// )
// app.post("/",
//     (req,res)=>{
//         //console.log(req.body)            //p1)*  post request ek wge data danna plwn, e data tika req.body wla atha. me data tika postman wge software ekk wge danna plwn, 
//                                   // eya frontend ekk wge peni idi, testing sdaha udau karai
//                                   //request eke body eka nikanm enne na ,ekt middleware ekk use krnn plwn, eya "express.json()"(meya piliwelt body ek hadai) kiyl me middleware ekk wge, 
//                                   // me middleware ekk use krla post request ek wge data danna plwn,
 
//                                  //me middleware ek plug krnn plwn, ewita aluth ekk awoth , one welwat ain krnn wge plwn
//         const newStudent = new Student(req.body)//newStudent kiyna variable eket plwn database eke thnym save wenna
    
//         newStudent.save().then( ////database eke save wei post request ekk awothaluthen student knk hadei request ewana hemwelem()

//                 () => {
//                     res.json({
//                         message : "Student added successfully" // dn hariyt save unth response ekk labei 
//                     })
//                 }
//         ) 
//     }
// )
// app.put("/",
//     (req,res)=>{
//         console.log('Put request received')
//     }
// )
// app.delete("/",
//     (req,res)=>{
//         console.log('Delete request received')
//     }
// )
// function success(){ //nikan functio ekk
//     console.log('srver startedd successfully')
// }
// app.listen(3000, success)//listen kiyl me app ek run krnn kiynw. me app kiyn ekt run wenn plwn nm success function ekth run krai. 
// me express kiyna app ek thniym listen krnn plwn , dn sucess kiyn function ek run krai

//function ekk api run krnw nm functionname () thynn one
// namuth dn mehi me app ek run karawai, frame work ekk wge. me app ek thmai thirane krnne kauda run krnne mona welawed kiyl


app.listen(3000,
    ()=>{
        console.log('server started successfully')
        console.log('Listening on port 3000')
    }
)
//java scrit wladi namak nathi function hadnn plwn, ewa anonymous function(arrow function) kiyl kiyai
//me fuction ek thnkt withrk one wen podi fuctio wlt ,function() kiyl hdnn nathiw lesi wdyt 
// me anonymous fuction hadnn plwn

//me app kiyn backend software ek wedada blnnn test krla http request dala blnn thanak thynn one , 
// e nisa frontend ekk one. emanisa podi softwre ekk one danata boruwt http request yawala blnn
//e sadaha 'postman' use krai(meya frontend ekk wge peni idi, testing sdaha udau karai)

//request ainly warga 4k atha
//get, post, put, delete

//get kiynne data ganna, 
// post kiynne data danna, 
// put kiynne data update krnne(denata thyena monhri wens krnn), 
// delete kiynne data delete krnne

//backend eke code ek wenskrna hema warem npm start diya yuthui.
//emnisa ey welekwimt developing krna time ekedi nodemon index.js use kla heka, 
// eya package.json eket wens krai node wenuwt 
