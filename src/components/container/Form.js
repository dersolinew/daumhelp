import React, { Component } from 'react';

export default class Form extends Component {
  
  onAdd = (e) => {
    e.preventDefault();

    // TODO Validação dos campos

    const name = document.getElementById("name").value;
    const amount = document.getElementById("amount").value;
    const unitPrice = document.getElementById("unit_price").value;

    if(name === "" || amount === "" || unitPrice === ""){
      alert("Preencha todos os campos do formulário")
      return false
    }

    if(amount == 0 || unitPrice == 0){
      alert("Coloque números a partir de 1")
      return false
    }

    let product = {
      name, 
      amount: parseFloat(amount), 
      unitPrice: parseFloat(unitPrice)
    };

    this.props.onAdd(product);

    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("unit_price").value = "";

    
  }

  

  render() {
    return (
      <section className="new-products">
        <h2>Incluir novo produto</h2>
        <form className="add_product" action="post" onSubmit={this.onAdd}>
          <input type="text" name="name" id="name" placeholder="Nome de Produto"/>
          <input type="number" name="amout" id="amount" placeholder="Quantidade"/>
          <input type="number" step="0.01" name="unit_price" id="unit_price" placeholder="Preço Unitário"/>
          <input type="submit" className="button" value="Cadastrar Novo Produto" onClick={this.validateForm}/>
        </form>
      </section>
      
    );
    }
  }
