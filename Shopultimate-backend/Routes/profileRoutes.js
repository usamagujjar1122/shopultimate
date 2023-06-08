const express = require("express");

const router = express.Router();
const {
  createprofile,
  updateprofile,
  deleteprofile,
  getprofile,
} = require("../Controllers/profileController");

const { auth } = require("../middleware/auth");

router.post("/", auth, createprofile);
router.get("/", auth, getprofile);
router.put("/", auth, updateprofile);
router.delete("/:id", auth, deleteprofile);

module.exports = router;
