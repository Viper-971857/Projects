const Product = require('../Models/ProductModels');
const ErrorHandler = require('../Utils/ErrorHandler');
const CatchAsyncErrors = require('../MiddleWare/CatchAsyncError');
const ApiFeatures = require('../Utils/ApiFeatures');



// CREATE PRODUCTS
exports.CreateProduct = CatchAsyncErrors(async(req,res,next) => {

    req.body.user = req.user.id

    const product = await Product.create(req.body);

    res.status(200).json({
        success:true,
        product
    })
});



// GET ALL PRODUCTS
exports.getAllProduct = CatchAsyncErrors ( async (req, res) => {

    const ResultPerPage = 8;
    const ProdctCount = await Product.countDocuments()

    const Api = new ApiFeatures(Product.find().req.query)
    .search()
    .filter()
    .Pagination(ResultPerPage);

    const products = await Api.query;

    res.status(200).json({
        success:true,
        products,
        ProdctCount,
        ResultPerPage
    })
    
});



// GET PRODUCT DETAILS
exports.getProductDetails = CatchAsyncErrors ( async (req,res,next) => {

    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler('product details not found',404))
    }

    res.status(200).json({
        success:true,
        product,
        ProdctCount
    })

});



// UPDATE PRODUCTS
exports.UpdateProduct = CatchAsyncErrors ( async (req,res,next) => {

    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('product details not found',404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,
    {new:true,
    runValidators:true,
    useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        product
    })

})



// DELETE PRODUCTS
exports.DeleteProduct = CatchAsyncErrors ( async (req,res,next) => {

    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler('product details not found',404))
    }

    await product.remove();

    res.status(200).json({
        success:true,
        message:"product deleted"
    })

});



// CREATE AND UPDATE REVIEWS
exports.CreateReviews = CatchAsyncErrors ( async (req,res,next) => {

    const {rating,comment,productId} = req.body

    const review = {
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((rev) => rev.user.toString()===req.user._id.toString());

    if(isReviewed){
        product.reviews.forEach(rev => {
        if(rev.user.toString() === req.user._id.toString())
            (rev.rating = rating),
            (rev.comment = comment)
        });
    }
    else{
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    let avg = 0;
    product.reviews.forEach(rev => {
        avg+=rev.rating
    })
    product.ratings = avg / product.reviews.length

    await product.save({validateBeforeSave:false})

    res.status(200).json({
        success:true
    })

});



// GET ALL REVIEWS
exports.getProductReviews = CatchAsyncErrors(async(req,res,next) =>{

    const product = await Product.findById(req.query.id)

    if(!product){
        return next(new ErrorHandler('product not found',404))
    }

    res.status(200).json({
        success:true,
        reviews:product.reviews
    })

});



// DELETE REVIEWS
exports.deleteReviews = CatchAsyncErrors(async(req,res,next) =>{

    const product = await Product.findById(req.query.productId)

    if(!product){
        return next(new ErrorHandler('product not found',404))
    }

    const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString())

    let avg = 0;
    reviews.forEach((rev) => {
        avg+=rev.rating
    })
    const rating = avg / reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        rating,
        numOfReviews
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true
    })

})