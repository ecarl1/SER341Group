import React, { Component } from "react";
import _ from "lodash";
class Products extends Component {
  state = {
    products: [
      { id: 2, name: "Product 2" },
      { id: 3, name: "Product 3" },
      { id: 1, name: "Product 1" },
    ],
  };
  sortProducts = () => {
    let sorted_products = this.state.product;
    if (this.props.sortBy === "name")
      sorted_products = _.orderBy(this.state.products, ["name"], "asc");
    return sorted_products;
  };
  render() {
    let sorted_products = this.sortProducts();
    return (
      <div>
        <h1>Products</h1>
        <ul>
          {sorted_products.map((product) => (
            <li key={product.id}>
              <a href={`/products/${product.id}`}>{product.name}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Products;
