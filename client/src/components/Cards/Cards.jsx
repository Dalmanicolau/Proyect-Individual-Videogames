import React from 'react'
import './Cards.css'

const Card = ({ name, genres, image, rating }) => {
    return(
        <div className='container'>
            <div className='card'>
            <img className='img' src={ image ? image : "" } alt="img not found" width="300px" height="300px" />
                <h3>{ name }</h3>
                {
                    genres && genres.map(({ name }, index) => <h5 key={index}>{ name } </h5>)
                }
                <h4>{rating}</h4>
            </div>
        </div>
    );
}

export default Card;
