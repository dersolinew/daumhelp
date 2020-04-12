import React, { Component } from 'react';
import { changeProductsOrder } from '../../logic/products';
import '../../global.css';
import Header from '../container/Header';
import Form from '../container/Form';
import List from '../container/List'

export default class ProductScreen extends Component {

  constructor() {
    super();
    this.state = {
      dragAndDrop: {
        productDragged: null,
      },
      products: [
        {
          id: 1,
          nome: 'Playstation 4',
          quantidade: 10,
          valorUnitario: 2000
        },
        {
          id: 2,
          nome: 'Xbox One',
          quantidade: 10,
          valorUnitario: 1500
        },
        {
          id: 3,
          nome: 'Nintendo Switch',
          quantidade: 5,
          valorUnitario: 1800
        },
        {
          id: 4,
          nome: 'Playstation 5',
          quantidade: 5,
          valorUnitario: 5000
        }
      ]
    };
  }

  onDragStart = (e) => {
    let productDragged = this.state.products.find((product) => product.id == e.target.id);
    this.setState({
      dragAndDrop: {
        productDragged
      }
    });
  }

  onDrop = (element) => {
    let { productDragged } = this.state.dragAndDrop;
    let targetProductId = element.id;
    let targetProduct = this.state.products.find((product) => product.id == targetProductId);

    let newProductsOrdered = changeProductsOrder(productDragged, targetProduct, this.state.products)

    this.setState({
      products: newProductsOrdered
    });
  }

  onDelete = (productId) => {
    let newListWithoutProduct = this.state.products.filter((product) => product.id != productId);

    this.setState({
      products: newListWithoutProduct
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        
        <section className="products-container">
          <h1>Products</h1>
          <Form />
          <List products={this.state.products} onDragStart={this.onDragStart} onDrop={this.onDrop} onDelete={this.onDelete} />
        </section>
      </div>
    );
  }

}
