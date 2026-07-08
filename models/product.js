import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
       
       productId : {
        type : String,
        required : true, //required kiynne me "productId" ek nathiw product wla record ek hadann be kiyana ekai
        unique : true
       },

       name : {
        type : String,
        required : true
       }, 

       altNames : {
        type : [String], //name array ekk, array ekk danne me dana nam wlin onema ekkin search karama userta me produt ek penwiya yuthu nisa
        default : [],
        required : true
       },

       description : {
        type : String,
        required : true
       },

       price : {
        type : Number,
        required : true
       },

       labelledPrice : {
        type : String,
        required : true
       },

       category : {
        type : String,
        required : true
       },

       images : {
        type : [String],
        default : ["/default-product-1.png","/default-product-2.png"],
        required : true
       },

       isAvailable : { //userslata wenas krnn beri ewa "is" wdyt dagnnw methanadi nikan
        type : Boolean,
        default : true,
        required : true
       },

       stock : {
        type : Number, //"number" wlata dashama sankya unath aithi java script wlata
        default : 0,
        required : true
       },

       brand : {
        type : String,
        required : false //brand ekk thiyennth plwn nathi wennth plwn e nisa false danwa 
       },

       model : {
        type : String,
        required : false
       }

    }
)
const Product = mongoose.model("Product", productSchema) //product kiynne collection ekk, me collection ek hadnn mehi me schema ek use krnw

export default Product