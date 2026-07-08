import express from "express"
import {createProduct, deleteProduct, updateProduct, getProductById, getAllProducts} from "../controllers/productController.js"


const productRouter = express.Router()

productRouter.post("/", createProduct) //product ekk create krnw, mehi post method ek use krnw, mehi productController.js file eke createProduct function ekk call krnw, mehi createProduct function eke req, res eka pass krnw
productRouter.get("/", getAllProducts) //product list ekk gnnwa, mehi get method ek use krnw, mehi productController.js file eke getAllProducts function ekk call krnw, mehi getAllProducts function eke req, res eka pass krnw

productRouter.get("/search", (req,res) => {
    res.json({message : "search endpoints"})
})

productRouter.delete("/:productId", deleteProduct) // mehidi "/"ta psse ellila ena parameter value ek product id ek wdyt gnn kiyla meyin kiyai
productRouter.put("/:productId", updateProduct) //product ekk update krnw, mehi put method ek use krnw, mehi productController.js file eke updateProduct function ekk call krnw, mehi updateProduct function eke req, res eka pass krnw
productRouter.get("/:productId", getProductById) 

// productRouter.get("/search", (req,res) => { //methana me code line ek thibboth, mehidi search kiyna eka ,
                                               // localhost:3000/products/search wdyt dunnma meka run wenn nthiw , udin thyna code line ek run weiii, mokada code line uda idan piliwelt run wena nisa(me prasne thynne "express" wla withrai habei)
//     res.json({message : "search endpoints"})
// })

export default productRouter