const express = require("express");

const router = express.Router();
const {
  additemtocart,
  getusercart,
  removeitemfromcart,
  cartitemdescreament,
  cartitemincreament,
} = require("../Controllers/cartController");
const { auth } = require("../middleware/auth");

router.post("/additemtocart/:id", auth, additemtocart);
router.post("/removeitemfromcart/:id", auth, removeitemfromcart);
router.post("/cartitemdecreament/:id", auth, cartitemdescreament);
router.post("/cartitemincreament/:id", auth, cartitemincreament);

router.get("/", auth, getusercart);

module.exports = router;
