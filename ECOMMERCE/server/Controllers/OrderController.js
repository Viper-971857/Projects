const Order = require('../Models/OrderModels');
const Product = require('../Models/ProductModels');
const ErrorHandler = require('../Utils/ErrorHandler');
const CatchAsyncErrors = require('../MiddleWare/CatchAsyncError');



// CREATE NEW ORDER
exports.newOrder = CatchAsyncErrors(async(req,res,next) => {

    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({

        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id,

    });

    res.status(201).json({
        success:true,
        order
    })

});


// GET SINGLE ORDER
exports.getSingleOrder = CatchAsyncErrors(async(req,res,next) => {

    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler('order not found with this id',404))
    }

    res.status(200).json({
        success:true,
        order
    })

});


// GET LOGGED IN USER ORDER
exports.myOrders = CatchAsyncErrors(async(req,res,next) => {

    const orders = await Order.find({user:req.user._id})

    res.status(200).json({
        success:true,
        orders
    })

});

// =========================== ADMIN USE ONLY =======================================

// GET ALL ORDERS
exports.getAllOrders = CatchAsyncErrors(async(req,res,next) => {

    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order)=>{
        totalAmount+=order.totalPrice
    })

    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })

});


// UPDATE ORDERS STATUS
exports.updateOrder = CatchAsyncErrors(async(req,res,next) => {

    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler('order not found',404))
    }

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler('You have already delivered this product',400))
    }

    order.orderItems.forEach(async(order) => {
        await updateStock(order.product,order.quantity)
    })

    order.orderStatus = req.body.status

    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now()
    }

    await order.save({validateBeforeSave:false})

    res.status(200).json({
        success:true
    })

});

async function updateStock (id,quantity) {
    const product = await Product.findById(id)

    product.stock-=quantity

    await product.save({validateBeforeSave:false})
}


// DELETE ORDERS
exports.deleteOrder = CatchAsyncErrors(async(req,res,next) => {

    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler('order not found',404))
    }

    await order.remove();

    res.status(200).json({
        success:true
    })

});



