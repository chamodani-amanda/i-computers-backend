
import jwt from "jsonwebtoken"
export default function authenticate (req, res, next) { //next function eken ilaga kenata request ek ywana ek krai

        const header = req.header("Authorization") //request ek athule thyna header ek print krai
        

        if (header == null) {
            next()
        }
        else{
            const token = header.replace("Bearer ","") //header ek token ekt amatharaw issrhin "Bearer " print wee , ey ain krna ek mehidi krai, token kiyl variable ekk hdgena
            

            jwt.verify(token ,  "secretkey143!!",
                (err,decoded)=>{ //mehidi secret key ek token eke nththm undefined kiyl ei,
                                        //emanisa hora token arn enn be
                req.user = decoded//token ek aththa nm, kaurhri token ekk dala request ekk euwanm middle ware eken passe thanwlt yddi, eyge user ge wisthra tikath athulath wela thma ynne. eyge wisthra oluwe alawala ynw wge ekk. 
                next()
                   
                }
            )
        }

    }