import React from 'react'
import { NavLink } from 'react-router-dom';

const Navigation = (props) => {
  return (
    <aside className="side-nav">
      <div className="logo-wrapper">
        <img className="logo" src="../images/logo-yellow.png" alt="Logo" />
        <img className="logo" src="../images/logo-black.png" alt="Logo" />
      </div>
      <ul>
        <li onClick={(e) => props.handleNavigationItemClicked()} className="pokeball"><NavLink exact to="/" activeClassName="active-navigation-item">Pokedex</NavLink></li>
        <li onClick={(e) => props.handleNavigationItemClicked()} className="typedex"><NavLink exact to="/typedex" activeClassName="active-navigation-item" >TypeDex</NavLink></li>
        <li onClick={(e) => props.handleNavigationItemClicked()} className="favorites"><NavLink exact to="/fav" activeClassName="active-navigation-item" >Favorites</NavLink></li>
        <li onClick={(e) => props.handleNavigationItemClicked()} className="exit"><NavLink exact to="/exit" activeClassName="active-navigation-item" >Exit</NavLink></li>
      </ul>
    </aside>

  );
}


export default Navigation;