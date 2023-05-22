import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getGamesByName } from "../../actions";

const SearchBar = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const handlerInputChange = (event) => {
    event.preventDefault()
    setName(event.target.value)
}

    const handlerSubmit = (event) => {
    event.preventDefault()
    dispatch(getGamesByName(name))
}

    return(
        <div>
            <input type="text" placeholder= "Buscar..." onChange={(event) => handlerInputChange(event)}/>
            <button type="submit" onClick={(event) => handlerSubmit(event)}>Buscar</button>
        </div>
    )
}


export default SearchBar;