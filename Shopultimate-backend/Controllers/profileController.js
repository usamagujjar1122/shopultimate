const Brand = require("../models/brandsModel");
const DeliveryAddress = require("../models/DeliveryAddressModel");
const Profile = require("../models/profileModel");

exports.createprofile = async (req, res) => {
  try {
    cconsole.log("p");
  } catch (error) {
    console.log(erroe);
  }
};
exports.getprofile = async (req, res) => {
  try {
    const user = req.user;
    const profile = await Profile.findOne({ user: req.user });
    if (profile) {
      return res.status(200).json({ success: true, data: profile });
    } else {
      const profile_ = await new Profile({ user: req.user });
      const profile = await profile_.save();
      return res.status(200).json({ success: true, data: profile });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.deleteprofile = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete({
      _id: req.params.id,
    });
    if (profile) {
      return res.status(200).json({ success: true, id: req.params.id });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.updateprofile = async (req, res) => {
  try {
    const user = req.user;
    const { bio, image, phone } = req.body;
    const profile = await Profile.findOneAndUpdate(
      { _user: req.user },
      { bio, image, phone },
      { new: true }
    ).populate("user");
    const data = await profile.save();
    return res.status(200).json({
      success: true,
      data: data,
      message: "Profile Updated Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
