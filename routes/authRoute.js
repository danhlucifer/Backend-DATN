const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getUser,
  updatedUser,
  updateAdmin,
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
  saveAddress
} = require("../controller/userController");
const router = express.Router();

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/regiser", createUser);

// forgot password
router.post("/forgot-password-token", forgotPasswordToken);

// reset Password
router.put("/reset-password/:token", resetPassword);

// update password
router.put("/password", authMiddleware ,updatePassword)

router.post("/login", loginUserCtrl);

router.post("/admin-login", loginAdmin);

router.get("/all-user", getallUser);

// refresh
router.get("/refresh", handleRefreshToken);

// logout
router.get("/logout", logout);

router.get("/wishlist",authMiddleware ,getWishlist); 

// get user by id
router.get("/:id",authMiddleware, isAdmin ,getUser); 

// edit User
router.put("/edit-user",authMiddleware, updatedUser);

// save address
router.put("/save-address", authMiddleware, saveAddress)

// block
router.put("/block-user/:id",authMiddleware, blockUser);
router.put("/unblock-user/:id",authMiddleware, unblockUser);


// delete user 
router.delete("/:id", deleteUser);



module.exports = router;
