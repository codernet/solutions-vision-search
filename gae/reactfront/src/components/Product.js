import React, { Component } from "react";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: {},
      quickViewProdcut: {},
      isAdded: false
    };
  }
  quickView(image, name, id) {
    this.setState(
      {
        quickViewProdcut: {
          image: image,
          name: name,
          id: id
        }
      },
      function() {
        this.props.openModal(this.state.quickViewProdcut);
      }
    );
  }
  render() {
    let image = this.props.image;
    let name = this.props.name;
    let id = this.props.id;
    let label = this.props.label;
    let labelJoin = label.join(", ");
    return (
      <div className="product">
        <div className="product-image">
          <img
            src={image}
            alt={this.props.name}
            onClick={this.quickView.bind(
              this,
              image,
              name,
              id
            )}
          />
        </div>
        <h4 className="product-name">{this.props.name}</h4>
        <h5 className="product-name">{labelJoin}</h5>
      </div>
    );
  }
}

export default Product;
