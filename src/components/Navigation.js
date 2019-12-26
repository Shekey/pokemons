import React from 'react'
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <aside className="side-nav">
      <div className="logo-wrapper">
        <img className="logo" src="../images/logo-yellow.png" alt="Logo"/>
      </div>
      <ul>
        <li className="pokeball"><Link to="/">Pokedex</Link></li>
        <li className="typedex"><Link to="/typedex">TypeDex</Link></li>
        <li className="favorites"><Link to="/fav">Favorites</Link></li>
        <li className="exit"><Link to="/exit">Exit</Link></li>
      </ul>
    </aside>

  );
}
export default Navigation;