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
  handleRefreshToken
} = require("../controller/userController");
const router = express.Router();

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/regiser", createUser);
router.post("/login", loginUserCtrl);

// refresh
router.get("/refresh", handleRefreshToken);

router.get("/all-user", getallUser);
// get user by id
router.get("/:id",authMiddleware, isAdmin ,getUser); 

// update user
router.put("/:id", updatedUser);

// block
router.put("/block-user/:id",authMiddleware, blockUser);
router.put("/unblock-user/:id",authMiddleware, unblockUser);

// delete user 
router.delete("/:id", deleteUser);

// edit info Admin
router.put("/edit-user",authMiddleware, updateAdmin);

module.exports = router;
