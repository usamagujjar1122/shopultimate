import React, { Component } from "react";
import { connect } from "react-redux";
import { getcart, removefromcart } from "../redux/actions/cartactions";

class Cart extends Component {
  componentDidMount() {
    this.props.getcart();
  }
  render() {
    //    console.log(this.props)

    return (
      <div>
        {this.props.cart.cartItems && this.props.cart.cartItems.length > 0 ? (
          this.props.cart.cartItems.map((item) => {
            return (
              <div key={item.product._id}>
                <h1>{item.product.productTitle}</h1>
                <h1>{item.product.productDescription}</h1>
                <h1>{item.quantity}</h1>
                <button
                  onClick={() => this.props.removefromcart(item.product._id)}
                >
                  Remove Item
                </button>
              </div>
            );
          })
        ) : (
          <div>no cart item</div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};
export default connect(mapStateToProps, { getcart, removefromcart })(Cart);
