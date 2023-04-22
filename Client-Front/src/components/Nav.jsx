import React from "react"
import SearchBar from "./SearchBar"
import { NavLink } from "react-router-dom"

export default function Nav({ onSearch, setAccess }) {

    const handleLogOut = () => {
        setAccess(false);

    }

    return (
        <nav>
            <SearchBar onSearch={onSearch} />
            <div>
                <NavLink to='/about'> About </NavLink>
                <br/>
                <NavLink to='/home'> Home </NavLink>  
                <br/>
                <NavLink to='/favorites'> Favorites </NavLink>
            </div>

            <button onClick={handleLogOut}>LOG OUT</button>
        </nav>
    )
}