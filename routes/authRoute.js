const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getUser,
  updateUser,
  updateAdmin,
  deleteUser,
  blockUser,
  unblockUser
} = require("../controller/userController");
const router = express.Router();

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/regiser", createUser);
router.post("/login", loginUserCtrl);
router.get("/all-user", getallUser);
// get user by id
router.get("/:id",authMiddleware, isAdmin ,getUser); 

// update user
router.put("/:id", updateUser);

// block
router.put("/block-user/:id",authMiddleware, blockUser);
router.put("/unblock-user/:id",authMiddleware, unblockUser);

// delete user 
router.delete("/:id", deleteUser);

// edit info Admin
router.put("/edit-user",authMiddleware, updateAdmin);

module.exports = router;
