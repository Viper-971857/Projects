const express = require('express');
const Auth = require('../MiddleWare/Auth')

const Router = express.Router();

const ProductController = require('../Controllers/ProductController');
const UserController = require('../Controllers/UserController');
const OrderController = require('../Controllers/OrderController');

// PRODUCTS ROUTES WITH AUTHORIZED USER
Router.get('/products',ProductController.getAllProduct);
Router.post('/admin/product/new',Auth.isAuthUser,Auth.AuthRoles('admin'),ProductController.CreateProduct);
Router.put('/admin/product/:id',Auth.isAuthUser,Auth.AuthRoles('admin'),ProductController.UpdateProduct);
Router.delete('/admin/product/:id',Auth.isAuthUser,Auth.AuthRoles('admin'),ProductController.DeleteProduct);
Router.get('/product/:id',ProductController.getProductDetails);

// PRODUCTS REVIEWS AND RATINGS
Router.put('/review',Auth.isAuthUser,ProductController.CreateReviews);
Router.get('/reviews',ProductController.getProductReviews);
Router.delete('/reviews',Auth.isAuthUser,ProductController.deleteReviews);


// USERS ROUTES
Router.post('/register',UserController.RegisterUser);
Router.post('/login',UserController.LoginUser);
Router.post('/password/forgot',UserController.ForgotPassword);
Router.put('/password/reset/:token',UserController.ResetPassword)
Router.get('/logout',UserController.LogoutUser);
Router.get('/me',Auth.isAuthUser,UserController.getUserDetails);
Router.put('/me/update',Auth.isAuthUser,UserController.updateProfile);
Router.put('/password/update',Auth.isAuthUser,UserController.updatePassword);


// USERS ROUTES (---- ADMIN ----)
Router.get('/admin/users',Auth.isAuthUser,Auth.AuthRoles('admin'),UserController.getAllUsers);
Router.get('/admin/user/:id',Auth.isAuthUser,Auth.AuthRoles('admin'),UserController.getAllUsersDetails);
Router.put('/admin/user/:id',Auth.isAuthUser,Auth.AuthRoles('admin'),UserController.setRole)
Router.delete('/admin/user/:id',Auth.isAuthUser,Auth.AuthRoles('admin'),UserController.deleteUser);


// ORDERS ROUTES
Router.post('/order/new',Auth.isAuthUser,OrderController.newOrder);
Router.get('/order/:id',Auth.isAuthUser,OrderController.getSingleOrder);
Router.get('/orders/me',Auth.isAuthUser,OrderController.myOrders);

// ORDER ROUTES (----- ADMIN -----)
Router.get('/admin/orders',Auth.isAuthUser,Auth.AuthRoles('admin'),OrderController.getAllOrders);
Router.put('/admin/order/:id',Auth.isAuthUser,Auth.AuthRoles('admin'),OrderController.updateOrder);
Router.delete('/admin/order/:id',Auth.isAuthUser,Auth.AuthRoles('admin'),OrderController.deleteOrder)



module.exports = Router;