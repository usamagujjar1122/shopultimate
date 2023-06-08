import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getproducts,
  deleteproduct,
  setCurrent,
} from "../../redux/actions/productactions";
import { addtocart } from "../../redux/actions/cartactions";

class Products extends Component {
  componentDidMount() {
    this.props.getproducts();
  }
  render() {
    console.log(this.props);

    return (
      <div>
        {this.props.products.products ? (
          this.props.products.products.map((product) => {
            return (
              <div key={product._id}>
                <h1>{product.productTitle}</h1>
                <h1>{product.productDescription}</h1>
                <button onClick={() => this.props.deleteproduct(product._id)}>
                  Delete
                </button>
                <button onClick={() => this.props.setCurrent(product)}>
                  Edit
                </button>
                <button onClick={() => this.props.addtocart(product._id)}>
                  Add to cart
                </button>
              </div>
            );
          })
        ) : (
          <div>loading</div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};
export default connect(mapStateToProps, {
  getproducts,
  deleteproduct,
  setCurrent,
})(Products);
