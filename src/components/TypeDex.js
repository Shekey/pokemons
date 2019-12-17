import React, { Component } from 'react'
import Navigation from './Navigation';

export default class TypeDex extends Component {
  render() {
    return (
      <div className="page-content-wrapper">
        <Navigation />
        <div className="content">
          TypeDex
        </div>
      </div>
    )
  }
}
