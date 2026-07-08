import User from '../models/user.js' //user model eka import krnw
import bcrypt from 'bcrypt' //bcrypt kiynne password encrypt krnw, meya password encrypt krnw udau karai, meya poronduwak wge
                            //meyata plwn salt value denna , password wlt
import jwt from 'jsonwebtoken' //jwt kiynne token generate krnw
import dotenv from 'dotenv' //dotenv kiyn function ek import krnw. me function ek .env file ek wge thyna variable tika read krnw udau karai
dotenv.config()//mehidi folder eke.env kiyl file ekk thynw nm eke thyna variables mekt load wei

export async function createUser(req, res) {

    try{
        const user = await User.findOne({email : req.body.email})
        
        if (user != null){ //user empty neththam
            res.json({message : "User already exists"}) //mey print krnw
            
            return //return krnw, meka naththam me code eka run wenna thiyenawa, den methnin pahala run wen na
       
        }   
        //create user
        //const newUser = new User(req.body) //new user ekk hadnn, mehi req.body use krnw, mehi user data thynwa. meya sampurnen weradi
        
        const passwordHash = bcrypt.hashSync(req.body.password, 10) //password encrypt krnw, meya poronduwak wge, meya password encrypt krnw udau karai, meya poronduwak wge
                                                                    //hashing wela ena value ek newatha newatha hash krna waara ganana thma me "10" kiynne.

        // console.log(passwordHash) //hash krn password eka print krnw
                                                                    
        const newUser = new User({ //manualy json ekk hadai methna
            email : req.body.email,
            password : passwordHash, //encrypt krn password eka database eke save krnw
            firstName : req.body.firstName,
            lastName : req.body.lastName
        })

        await newUser.save()
        res.json({message : "User created successfully"})
    }
    catch(err){
        res.json({message : err.message})
    }

}

export async function loginUser(req, res) {
    try{

        const email = req.body.email
        const password = req.body.password

        if (email == null || password == null){

           //res.json({message : "Email and password are required"})
            
           //with status code (400 ganan number front end/user paththen siduwena werdi sadaha use karai)
           res.status(400).json({message : "Email and password are required"})//me wdyt standard wdyt error ek pennai
           return //apahu harawla yawai wede krnn be kiyl, MITA PHALA ewa run wen na

        }

        const user = await User.findOne({email : email}) //email eka database eke check krnwa
        
        if (user == null){ //email eka database eke naththam
            
            //res.json({message : "User not found"})
            
            res.status(404).json({message : "User not found"}) //me wdyt standard wdyt error ek pennai
            return
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password) //password valid da ndd kiyl check kragani

        if (isPasswordValid){ //password valid nam

            const token = jwt.sign( //token ekk generate krnwa
            //dn me wisthara thyna token ekk lebe
            //MEHIDI GENERATE WENA ENCRYPTION VALue ek newatha laba gnn plwn "jwt" website eken,habei 
            // key (signature) ek dan nthiw encryption value ekk generate krgnn be katawth, invalid kiyl wetenne ethota
                {
                    email : user.email,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    isAdmin : user.isAdmin,
                    isBlocked : user.isBlocked,
                    isEmailVerified : user.isEmailVerified,
                    image : user.image

                },

                process.env.JWT_SECRET_KEY  //secret key ekk laba dei, 
            )

            res.json({message : "Login successful", token : token}) //token ekk response eke me wenna

            //res.json({message : "Login successful"})

        } else{ //VALid naththam
            //res.json({message : "Invalid password"})

            res.status(401).json({message : "Invalid password"}) //me wdyt standard wdyt error ek pennai
        }


     } catch(err){

        res.json({message : "User not found"})
        return

     }
}