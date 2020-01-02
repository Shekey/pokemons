import React from 'react'
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <aside className="side-nav">
      <div className="logo-wrapper">
        <img className="logo" src="../images/logo-yellow.png" alt="Logo"/>
      </div>
      <ul>
        <li className="pokeball"><NavLink exact  to="/" activeClassName="active-navigation-item" onlyActiveOnIndex>Pokedex</NavLink></li>
        <li className="typedex"><NavLink exact to="/typedex" activeClassName="active-navigation-item" onlyActiveOnIndex>TypeDex</NavLink></li>
        <li className="favorites"><NavLink exact to="/fav" activeClassName="active-navigation-item" onlyActiveOnIndex>Favorites</NavLink></li>
        <li className="exit"><NavLink exact to="/exit"activeClassName="active-navigation-item" onlyActiveOnIndex>Exit</NavLink></li>
      </ul>
    </aside>

  );
}
export default Navigation;