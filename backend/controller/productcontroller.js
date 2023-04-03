const Product = require("../models/productschema");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// create product

exports.createProduct = catchAsyncErrors(async(req,res)=>{
   
   req.body.user = req.user.id;
   
   const product = await Product.create(req.body);

   res.status(201).json({
      success:true,
      product,
   })
})

exports.getAllProducts = async(req,res)=>{

   const resultPerPage = 5;
   const productCount = await Product.countDocuments()

 const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage)
   const products = await apiFeature.query

   res.status(200).json({success:true,products,productCount})
}

exports.updateProduct = async(req,res)=>{
   let product = Product.findById(req.params.id);

   if(!product){
      return res.status(500).json({
         success:false,
         message:"Product not found"
      })
   }

   product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false})

   res.status(200).json({
      success:true,
      product
   })
}

//Delete product

exports.deleteproduct=async(req,res)=>{
   const product = await Product.findById(req.params.id);
   
   if(!product){
      return res.status(500).json({success:false,
      message:"Product not found"})
   }

   await product.deleteOne()

   res.status(200).json({success:true,
   message:"Product has been deleted"})
}

// get product details

exports.getproductDetails= async(req,res,next)=>{
   const product = await Product.findById(req.params.id)

   if(!product){
      return next(new ErrorHandler("product not found", 404))
   }

   res.status(200).json({
      success:true,
      product
   })

}