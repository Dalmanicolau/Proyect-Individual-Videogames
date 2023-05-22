import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameByID } from "../../actions";
import { useParams } from "react-router-dom";


const Detail = () => {
    const dispatch = useDispatch();
    const { videogameID } = useParams();
    const videogame = useSelector(state => state.videogame);



    useEffect(() => {
        dispatch(getVideogameByID(videogameID))
    }, [ dispatch, videogameID ])

    return videogame ? (
        <div>
            <h2>{videogame.id}</h2>
            <img src={videogame.image} alt="videogame" />
            <p>{videogame.name}</p>
            <p>{videogame.description}</p>
            <p>{videogame.platforms}</p>
            <p>{videogame.year_start}</p>
            {
                videogame?.genres?.map(genre => <p>{genre.name}</p>)
            }
            <p>{videogame.rating}</p>
        </div>
    ) : <div></div>
}

export default Detail;