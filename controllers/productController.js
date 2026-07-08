//create,delete,update,read operations handle krnw

import Product from "../models/product.js" //product collection ek handle krnw. me collection ekk hadnn mehi me model ek import krnw

export async function createProduct(req,res) {

       if (req.user == null){ //request ek user knk newei nm product ekk create krnn be(token ekk nathiw)

            res.status(401).json({
                message : "Unauthorized"
            })
            return//function ek nawaththai, user knk newei nm
        }

        if(!req.user.isAdmin){ //request ek ewana user admin knk newei nm meya true we
            res.status(403).json({
                message : "Only admins can create products"
            })
            return
        }

        try{

            const existingProduct = await Product.findOne({productId : req.body.productId}) //product eke name eka database eke thiyena ekk check krnne

            if(existingProduct != null){ //product id ek danatamth databas eke thyna ekkd kiyla blnwa
                res.status(400).json({
                    message : "Product with this productId already exists"
                })
                return
            }

            
            const product = new Product(req.body)
            await product.save()
            res.json({
                message : "Product created successfully"
            })

        }
        catch(err){
            res.status(500).json({
                message : err.message})
        }

        
}  

export async function getAllProducts(req,res) {
    try{
        if (req.user != null && req.user.isAdmin){ //admin knkt me product list ek gnn plwn
            //request ek user knk nTHTHam and user admin kenek nm product list ekk gnn be(token ekk nathiw)

        const products = await Product.find()
        res.json(products)
        }

        else{
            const products = await Product.find({isAvailable : true}) //available true thyna product list eka gnn plwn
        }
        
    }
    catch(err){
        res.status(500).json({
            message : err.message
        })
    }
}

export async function deleteProduct(req,res) {

     if (req.user != null && req.user.isAdmin){

        try{
        const product = await Product.findOne({productId : req.params.productId}) //productId ekk thyna product ekk database eke thyna ekk check krnne

        if(product == null){ //productId ekk thyna product ekk database eke nathnm
            res.status(404).json({ message : "Product not found" })
            return
        }

        await Product.deleteOne({productId : req.params.productId}) //productId ekk thyna product ekk database eke thyna ekk delete krai
        
        res.json({message : "Product deleted successfully"})
     }

        catch(err){
            res.status(500).json({message : err.message})
        }
     }


     else{
     
        res.status(403).json({message : "Only admins can delete products"})
        return
     }
}

export async function updateProduct(req,res) {

    if (req.user != null && req.user.isAdmin){  

        try{
            if(req.body.productId != null){ //request eke body eke product id ek thynw nm ,update krnn be,mokda samnyn productId ek wge ewa wens krn na
            
                res.status(400).json({message : "ProductId cannot be updated"})
                return
            }

            await Product.updateOne({productId : req.params.productId}, req.body) //productid ekt adala product eke body eke thyna value wlin me product ek update krnn kiyai
            //productId ekk thyna product ekk database eke thyna ekk update krai, update krnw req.body wla thyna data ekk use krla
            res.json({message : "Product updated successfully"})

        }

        catch(err){
            res.status(500).json({message : err.message})
        }
    }
    else{

        res.status(403).json({message : "Only admins can update products"})
        return
    }

}

export async function getProductById(req,res) { //ME FUNction eken adala ek product ekaka data tika dei

    try{
        const product = await Product.findOne({productId : req.params.productId}) //productId ekk thyna product ekk database eke thyna ekk gnn kiyai
    
        if(product == null){ //productId ekk thyna product ekk database eke nathnm
            res.status(404).json({ message : "Product not found" })
            return
        }
        
        if (product.isAvailable){ //product available nm kisi aulk na adala wisthara tika denna plwn

            res.json(product)
        }

        else{

            if (req.user != null && req.user.isAdmin){ //product ekk available newei nm, admin knkt me product list ekk gnn plwn
                res.json(product)
            }
            else{
                res.status(403).json({message : "Only admins can view unavailable products"})
                return
            }
        }
     }

    catch{
        res.status(500).json({message : err.message})
    }
    
}