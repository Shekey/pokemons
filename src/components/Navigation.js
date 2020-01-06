import React from 'react'
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <aside className="side-nav">
      <div className="logo-wrapper">
        <img className="logo" src="../images/logo-yellow.png" alt="Logo" />
      </div>
      <ul>
        <li className="pokeball"><NavLink exact to="/" activeClassName="active-navigation-item">Pokedex</NavLink></li>
        <li className="typedex"><NavLink exact to="/typedex" activeClassName="active-navigation-item" >TypeDex</NavLink></li>
        <li className="favorites"><NavLink exact to="/fav" activeClassName="active-navigation-item" >Favorites</NavLink></li>
        <li className="exit"><NavLink exact to="/exit" activeClassName="active-navigation-item" >Exit</NavLink></li>
      </ul>
    </aside>

  );
}


export default Navigation;