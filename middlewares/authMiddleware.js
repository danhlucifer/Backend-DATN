// xác minh Mã thông báo JWT
// kiểm tra xem người dùng có phải là ADMIN hay không

const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
require("dotenv").config();

// Check User
const authMiddleware = asyncHandler(async (req, res, next) =>{
    //lấy JWT trong Ủy quyền tiêu đề.
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        // Nó sẽ kiểm tra xem authorizationtiêu đề có thoát hay không và gán authorization 
        //chuỗi bao gồm cả tiêu đề bearerđó và trước tiên bạn cần tách biệt nó để xác minh mã thông báo
        try{
            if (token){
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded?.id);
                req.user = user;
                next();
            }
        }catch (error){
            throw new Error("Not Authorized token Expired, Please Login again!")
        }
    }else{
        throw new Error("There is no token attached to header")
    }
});

// check ADM
const isAdmin = asyncHandler(async (req, res, next) =>{
    const {email} = req.user;
    const adminUser = await User.findOne({email});
    if(adminUser.role !== "admin"){
        throw new Error("You are not an Admin");
    }else{
        next();
    }
})

module.exports = {authMiddleware, isAdmin};