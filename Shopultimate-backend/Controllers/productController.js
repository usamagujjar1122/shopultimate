const Product = require("../models/productModel");
const Shop = require("../models/shopModel");

exports.getallproducts = async (req, res) => {
  try {
    // const page = req.query.page;
    // const limit = 9;
    // const startindex = (page - 1) * limit;
    // const lastindex = page * limit;
    const products = await Product.find().populate([
      "shop",
      "user",
      "catagery",
    ]);

    // .limit(limit)
    // .skip(startindex)
    const count = await Product.count({});
    return res
      .status(200)
      .json({ success: true, data: products, count: count });
  } catch (error) {
    console.log(error);
  }
};
exports.getuserproducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user }).populate([
      "shop",
      "catagery",
    ]);
    console.log(products);
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(error);
  }
};
exports.getproductsbycatagery = async (req, res) => {
  try {
    const products = await Product.find({ catagery: req.params.id }).populate([
      "shop",
      "user",
      "catagery",
    ]);
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(error);
  }
};
exports.getsingleproduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id }).populate([
      "shop",
      "catagery",
    ]);
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.log(error);
  }
};
exports.addproduct = async (req, res) => {
  try {
    const {
      productTitle,
      productDescription,
      images,
      price,
      catagery,
      subcatagery,
      instock,
      shop,
      brand,
      discount,
    } = req.body;
    if (!productTitle) {
      return res
        .status(400)
        .json({ success: false, message: "Product Name is Required" });
    }
    if (!productDescription) {
      return res
        .status(400)
        .json({ success: false, message: "Product Description is Required" });
    }
    if (!catagery) {
      return res
        .status(400)
        .json({ success: false, message: "Catagery is Required" });
    }
    // if (!subcatagery) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Sub Catagery is Required" });
    // }
    if (!price) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter Product price" });
    }
    if (!instock) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter Stock" });
    }
    if (!shop) {
      return res
        .status(400)
        .json({ success: false, message: "Shop is Required" });
    }
    if (!brand) {
      return res
        .status(400)
        .json({ success: false, message: "Please Select Product Brand" });
    }
    const product = await new Product({
      user: req.user,
      productTitle: productTitle,
      productDescription: productDescription,
      images,
      price,
      catagery,
      // subcatagery,
      instock,
      shop,
      brand,
      discount,
    });
    const data = await product.save();
    const producttoshop = await Shop.findById({ _id: shop });
    producttoshop.products.push(data);
    await producttoshop.save();
    return res
      .status(200)
      .json({ success: true, data, message: "Product Created Sucessfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
};
exports.updateproduct = async (req, res) => {
  try {
    console.log(req.body);
    const {
      productTitle,
      productDescription,
      images,
      isActive,
      brand,
      discount,
      instock,
    } = req.body;
    const productp = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        productTitle,
        productDescription,
        images,
        isActive,
        brand,
        discount,
        instock,
      },
      { new: true }
    );
    const product = await productp.save();
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.log(error);
  }
};
exports.deleteproduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
