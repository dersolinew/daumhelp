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
      products: [],
      filter: {
        products: []
      },
      nextId: null,
      reusableIds: []
    };
  }

  componentDidMount() {
    let nextId = parseInt(localStorage.getItem('nextId') || 1);
    let reusableIds = JSON.parse(localStorage.getItem('reusableIds')) || [];
    let products = JSON.parse(localStorage.getItem('products')) || [];
    console.log({products});
    this.setState({
      products,
      filter: {
        products,
      },
      nextId
    });
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
      products: newProductsOrdered,
      filter: {
        products: newProductsOrdered
      }
    });
  }

  onDelete = (productId) => {
    let newListWithoutProduct = this.state.products.filter((product) => product.id != productId);
    let reusableIds = [...this.state.reusableIds];

    reusableIds.push(productId);
    reusableIds.sort().reverse();

    this.setState({
      products: newListWithoutProduct,
      reusableIds,
      filter: {
        products: newListWithoutProduct,
      }
    }, () => {
      localStorage.setItem('products', JSON.stringify(this.state.products));
      localStorage.setItem('reusableIds', JSON.stringify(this.state.reusableIds));
    });
  }

  onAdd = (product) => {
    let nextId = this.state.nextId;
    let reusableIds = [...this.state.reusableIds];
    let products = [...this.state.products];

    if (reusableIds.length === 0) {
      product.id = nextId++;
    } else {
      product.id = parseInt(reusableIds.pop());
    }

    products.push(product);
    products = products.sort((a, b) => a.id - b.id);
  
    this.setState({
      products,
      nextId,
      filter: {
        products,
      },
      reusableIds
    }, () => {
      localStorage.setItem('products', JSON.stringify(this.state.products));
      localStorage.setItem('nextId', this.state.nextId);
      localStorage.setItem('reusableIds', JSON.stringify(this.state.reusableIds));
    });
  }

  onMakeSearch = (name) => {
    let productsThatMatch = this.state.products.filter((product) => product.name.toLowerCase().startsWith(name.toLowerCase()));

    this.setState({
      filter: {
        products: productsThatMatch
      }
    });
  }
 
  render() {
    return (
      <div className="App">
        <Header onMakeSearch={this.onMakeSearch} />
        
        <section className="products-container">
          <Form onAdd={this.onAdd} />
          <h1>Produtos</h1>
          <List products={this.state.filter.products} 
            onDragStart={this.onDragStart} 
            onDrop={this.onDrop} 
            onDelete={this.onDelete} />
        </section>
      </div>
    );
  }

}
