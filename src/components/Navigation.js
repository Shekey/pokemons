import React from 'react'

const Navigation = () => {
  return (
    <aside className="side-nav">
      <div className="logo-wrapper">
        <img className="logo" src="../images/logo-yellow.png" alt="Logo"/>
      </div>
      <ul>
        <li className="pokeball"><a href="/">Pokedex</a></li>
        <li className="typedex"><a href="./typedex">TypeDex</a></li>
        <li className="favorites"><a href="./fav">Favorites</a></li>
        <li className="exit"><a href="./exit">Exit</a></li>
      </ul>
    </aside>

  );
}
 
export default Navigation;