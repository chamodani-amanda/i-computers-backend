import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    
    email : {
        type : String,
        unique : true, //email eka unique wenna ona
        required : true //email ek aniwayai
    },

    password : {
        type : String,
        required : true 
    },

    firstName :  {
        type : String,
        required : true 
    },

    lastName :  {
        type : String,
        required : true 
    },

    isAdmin :  {
        type : Boolean,
        required : true,
        default : false 
    },

    iaBlocked : {
        type : Boolean,
        required : true,
        default : false 
    },

    isEmailVerified : {
        type : Boolean,
        required : true,
        default : false 
    },

    image : {
        type : String,
        required : false,
        default : "default-profile.png" //default image ekk set krnw
    }

})

const User = mongoose.model("User", userSchema) //model ekk hadnn mehi me schema eka use krnw, me model ekk "User" kiynna name ekk wge thyna

export default User