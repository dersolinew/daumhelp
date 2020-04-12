import React, { Component } from 'react';
import logoImg from '../../assets/umhelp-logo-white.svg'

export default class Header extends Component {
  render() {
    return (
      <header>
        <div className="header-container">
          <a href="https://da1help.com/" target="_blank" rel="noopener noreferrer">
            <img src={logoImg} alt="Da1Help" />
          </a>
          <input type="text" placeholder="Pesquise um produto aqui..."/>
        </div>
      </header>
    );
  }
}
