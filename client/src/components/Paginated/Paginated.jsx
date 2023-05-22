import React from "react";
import './Paginated.css'

const Pagination = ({ gameByPage, allVideogames, paginated }) => {
    const pageNumbers = []
    
    for (let i=0; i < Math.ceil(allVideogames/gameByPage); i++){
        pageNumbers.push(i + 1)
    }
    
    return (
       <nav>
            <li className= 'paginado'>
                {
                pageNumbers.map(number =>{
                    return (
                        <ul className='buttonPaginado' key={number}>
                            <button className='buttonPaginado' onClick={() => {paginated(number)}}>{number}</button>
                        </ul>
                    )
                })}
            </li>
       </nav>
    )
}


export default Pagination;