import React, { Component } from "react";
import Product from "./Product";
import LoadingProducts from "../loaders/Products";
import NoResults from "../empty-states/NoResults";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

class Products extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      images: [],
      facets: []
    }
  }

  componentDidMount() {
    fetch("https://driven-stage-181109.appspot.com/query")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            images: result.documents,
            facets: result.facets
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const {error, isLoaded, items } = this.state;
    if (error) {
      return (<div>Error: {error.message}</div>);
    } else if (!isLoaded) {
      return (<div>Loading...</div>);
    }
    let productsData;
    //let term = this.props.searchTerm;
    let x;

    function searchingFor(term) {
      return function(x) {
        return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
      };
    }
    /*
    productsData = this.props.productsList
      .filter(searchingFor(term))
      .map(product => {
        return (
          <Product
            key={product.id}
            name={product.name}
            image={product.image}
            id={product.id}
            openModal={this.props.openModal}
          />
        );
      });
      */
    productsData = this.state.images
      .map(product => {
        return (
          <Product
            key={product.doc_id}
            name={product["fields"]["image_id"][0]}
            image={product["fields"]["preview_url"][0]}
            id={product["doc_id"]}
            label={product.fields.label}
            openModal={this.props.openModal}
          />
          );
      });
    // Empty and Loading States
    let view;
    if (productsData.length <= 0 && !term) {
      view = <LoadingProducts />;
    } else if (productsData.length <= 0 && term) {
      view = <NoResults />;
    } else {
      view = (
        <CSSTransitionGroup
          transitionName="fadeIn"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          component="div"
          className="products"
        >
          {productsData}
        </CSSTransitionGroup>
      );
    }
    return <div className="products-wrapper">{view}</div>;
  }
}

export default Products;
