const express = require("express");

const router = express.Router();
const {
  initorder,
  getorderc,
  getsingleorder,
  getorders,
  updateorder,
  selleracount,
  check,
  ordercomplete,
  getpayments,
  getallorders,
  clearpayments,
  getallpayments,
  transferfunds,
} = require("../Controllers/orderController");
const { auth } = require("../middleware/auth");

router.get("/paymentt", auth, getpayments);
router.get("/getallpayments", auth, getallpayments);
router.get("/clearpayments", auth, clearpayments);
router.get("/transferfunds", auth, transferfunds);

router.get("/all", auth, getallorders);

router.post("/create-order", auth, initorder);
router.get("/ordersc", auth, getorderc);
router.get("/orderss", auth, getorders);
router.put("/:id", auth, updateorder);
router.get("/connect", auth, selleracount);
router.get("/check", auth, check);

router.get("/:id", auth, getsingleorder);
router.put("/complete/:id", auth, ordercomplete);

module.exports = router;
