import React, { Component } from 'react'
import Navigation from './Navigation';

export default class Favorites extends Component {
  render() {
    return (
      <div className="page-content-wrapper">
        <Navigation />
        <div className="content">
          Favorites
        </div>
      </div>
    )
  }
}
