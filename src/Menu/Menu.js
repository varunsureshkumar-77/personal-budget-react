import React from 'react'
import { Link } from 'react-router-dom';

function Menu() {
  return (
     <nav aria-label="Main navigation">
        <ul>
            <li><Link to="/" aria-current="page">Home</Link></li>
            <li><Link to="/about" >About</Link></li>
            <li><Link to="/login" >Login</Link></li>
            <li><Link to="https://google.com" target="_blank" rel="noopener">Google</Link></li>
        </ul>
    </nav>

  )
}

export default Menu