import React, { Component } from 'react';
import DraggableRow from '../drag-and-drop/DraggableRow';


export default class List extends Component {

  clickRemove = (e) => {
    e.preventDefault();
    let productId = e.target.parentElement.parentElement.id;
    this.props.onDelete(productId);
  }

  render() {
    return (
      <div className="products">
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Quantidade em estoque</th>
              <th>Preço unitário</th>
              <th>Valor Total</th>
              <th>Remover</th>
            </tr>
          </thead>
          <tbody>
          {
            this.props.products.map((produto) => {
              return (
                <DraggableRow key={produto.id} id={produto.id} onDragStart={this.props.onDragStart} onDrop={this.props.onDrop}>
                  <td>{produto.id}</td>
                  <td>{produto.name}</td>
                  <td>{produto.amount}</td>
                  <td>{produto.unitPrice.toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'})}</td>
                  <td>{(produto.unitPrice * produto.amount).toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'})}</td>
                  <td><a onClick={this.clickRemove}>Remover</a></td>
                </DraggableRow>
              );
            })
          }
          </tbody>
        </table>
      </div>
    );
  }
}
