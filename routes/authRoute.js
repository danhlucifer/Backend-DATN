const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getUser,
  updatedUser,
  deleteUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
} = require("../controller/userController");
const router = express.Router();

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/regiser", createUser);

// forgot password
router.post("/forgot-password-token", forgotPasswordToken);

// reset Password
router.put("/reset-password/:token", resetPassword);

router.put("/order/update-order/:id",authMiddleware, isAdmin ,updateOrderStatus)

// update password
router.put("/password", authMiddleware, updatePassword);

router.post("/login", loginUserCtrl);

router.post("/admin-login", loginAdmin);

router.post("/cart", authMiddleware, userCart);
router.post("/cart/applyCoupon", authMiddleware, applyCoupon);

router.post("/cart/cash-order", authMiddleware, createOrder)

router.get("/all-user", getallUser);

router.get("/get-order", authMiddleware, getOrders)

// refresh
router.get("/refresh", handleRefreshToken);

// logout
router.get("/logout", logout);

router.get("/wishlist", authMiddleware, getWishlist);

router.get("/cart", authMiddleware, getUserCart);

// get user by id
router.get("/:id", authMiddleware, isAdmin, getUser);
router.delete("/empty-cart", authMiddleware, emptyCart);

// edit User
router.put("/edit-user", authMiddleware, updatedUser);

// save address
router.put("/save-address", authMiddleware, saveAddress);

// block
router.put("/block-user/:id", authMiddleware, blockUser);
router.put("/unblock-user/:id", authMiddleware, unblockUser);

// delete user
router.delete("/:id", deleteUser);

module.exports = router;
