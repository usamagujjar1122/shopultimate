const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
exports.additemtocart = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id }).populate(
      "shop"
    );
    const cartitem = {
      product: req.params.id,
      quantity: 1,
    };
    const user = await User.findOne({ _id: req.user });
    if (!user) {
    }
    const cart = await Cart.findOne({
      user: req.user._id,
      store: product.shop,
    }).populate("cartItems.product");

    if (cart) {
      if (cart.cartItems.length > 0) {
        for (let index = 0; index < cart.cartItems.length; index++) {
          const element = cart.cartItems[index];
          // console.log(element.product.user.equals(product.user));
          if (element.product.user.equals(product.user) === false) {
            return res.status(400).json({ message: "Something went wrong" });
          }
        }
      }
      const cartitem = {
        product: req.params.id,
        quantity: 1,
      };
      for (let index = 0; index < cart.cartItems.length; index++) {
        const element = cart.cartItems[index];
        if (req.params.id == element.product._id) {
          element.quantity += 1;
          cart.carttotal += element.product.price;
          const mcart = await cart.save();
          return res.status(200).json({ data: mcart, product });
        }
      }
      await cart.cartItems.push(cartitem);
      cart.carttotal += product.price;
      const mcart = await cart.save();
      return res
        .status(200)
        .json({ data: mcart, product, message: "Item Added To Cart" });
    }
    const uuucart = await new Cart({ user: req.user, store: product.shop });
    await uuucart.cartItems.push(cartitem);
    uuucart.carttotal += product.price;
    await uuucart.save();
    const mcart = await Cart.find({
      user: req.user._id,
      store: product.shop,
    }).populate([
      {
        path: "store",
        model: "Shops",
      },
      {
        path: "cartItems.product",
        // Get friends of friends - populate the 'friends' array for every friend
        populate: { path: "shop" },
      },
    ]);
    return res.status(200).json({ data: mcart, product });
  } catch (error) {
    console.log(error);
  }
};
exports.removeitemfromcart = async (req, res) => {
  console.log(req.body);
  try {
    const ucart = await Cart.findOne({
      user: req.user._id,
      store: req.body.storeid,
    }).populate("cartItems.product");
    // if (ucart.cartItems.length == 1) {
    //   await ucart.delete();
    //   return res
    //     .status(200)
    //     .json({ data: ucart, message: "Item Removed From Cart" });
    // }
    if (ucart) {
      for (let index = 0; index < ucart.cartItems.length; index++) {
        const element = ucart.cartItems[index];
        if (element.product._id == req.params.id) {
          // console.log('null')
          ucart.cartItems.pop(element);
          ucart.carttotal -= element.product.price * element.quantity;
        }
      }
      const cart = await ucart.save();
      return res
        .status(200)
        .json({ data: ucart, message: "Item Removed From Cart" });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.getusercart = async (req, res) => {
  try {
    // let total = 0;
    let ucart = await Cart.find({ user: req.user._id }).populate({
      path: "cartItems.product",
      // Get friends of friends - populate the 'friends' array for every friend
      populate: { path: "shop" },
    });
    if (ucart) {
      for (let index = 0; index < ucart.length; index++) {
        if (ucart[index].cartItems.length == 0) {
          const cartt = await Cart.findOneAndDelete({ _id: ucart[index]._id });
        }
      }
      ucart = await Cart.find({ user: req.user }).populate([
        {
          path: "store",
          model: "Shops",
        },
        {
          path: "cartItems.product",
          populate: { path: "shop" },
        },
      ]);

      // .populate({
      //   path: "cartItems.product",
      //   // Get friends of friends - populate the 'friends' array for every friend
      //   populate: { path: "shop" },
      // });
      for (let index = 0; index < ucart.length; index++) {
        let total = 0;

        const element = ucart[index];
        for (let indexx = 0; indexx < element.cartItems.length; indexx++) {
          const elementt = element.cartItems[indexx];
          total = total + elementt.product.price * elementt.quantity;
          // element.carttotal = total;
          // console.log(total);
        }
        await Cart.findByIdAndUpdate(
          { _id: element._id },
          { carttotal: total }
        );
      }

      return res.status(200).json({ data: ucart, message: "cart" });
    }

    const uuucart = await new Cart({ user: req.user });
    const cart = await uuucart.save();
    return res.status(200).json({ data: cart });
    // console.log(cart)
    // if (cart) {
    //     const productid = req.params.id
    //     const product = await Product.findOne({_id:req.params.id})
    //     await cart.cartItems.push(product)
    //    const c= await cart.save()
    //     console.log(cart)
    // const cartt = await Cart.findOneAndUpdate({user:req.user._id},{"$push":{"cartItems":req.body.cartItems}})
  } catch (error) {
    console.log(error);
  }
};

exports.cartitemincreament = async (req, res) => {
  // console.log(req.body);
  try {
    let quantitytosend = 0;
    const ucart = await Cart.findOne({
      user: req.user._id,
      store: req.body.storeid,
    }).populate({
      path: "cartItems.product",
      // Get friends of friends - populate the 'friends' array for every friend
    });
    // console.log(ucart.cartItems);
    for (let index = 0; index < ucart.cartItems.length; index++) {
      const element = ucart.cartItems[index];
      if (element.product._id == req.params.id) {
        quantitytosend = element.quantity += 1;
        ucart.carttotal += element.product.price;
      }
    }
    const cart = await ucart.save();
    return res.status(200).json({
      data: quantitytosend,
      message: "Quantity Increased",
      carttotal: cart.carttotal,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.cartitemdescreament = async (req, res) => {
  try {
    let quantitytosend = 0;
    const ucart = await Cart.findOne({
      user: req.user._id,
      store: req.body.storeid,
    }).populate({
      path: "cartItems.product",
      // Get friends of friends - populate the 'friends' array for every friend
    });
    console.log(ucart);
    if (ucart.cartItems.length <= 0) {
      console.log("jjj");
      await ucart.delete();
    }
    for (let index = 0; index < ucart.cartItems.length; index++) {
      const element = ucart.cartItems[index];
      if (element.product._id == req.params.id) {
        quantitytosend = element.quantity -= 1;
        ucart.carttotal -= element.product.price;
      }
    }
    const cart = await ucart.save();
    return res.status(200).json({
      data: quantitytosend,
      message: "Quantity Decreased",
      carttotal: cart.carttotal,
    });
  } catch (error) {
    console.log(error);
  }
};
