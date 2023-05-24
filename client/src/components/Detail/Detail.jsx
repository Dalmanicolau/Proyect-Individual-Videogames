import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameByID } from "../../actions";
import { useParams } from "react-router-dom";
import './Detail.css'


const Detail = () => {
    const dispatch = useDispatch();
    const { videogameID } = useParams();
    const videogame = useSelector(state => state.videogame);



    useEffect(() => {
        dispatch(getVideogameByID(videogameID))
    }, [ dispatch, videogameID ])

    return videogame ? (
    <body id="background3">
        <div>
            <h2 className="idnum">{videogame.id}</h2>
            <p className="name">{videogame.name}</p>
            <img src={videogame.image} alt="videogame" width="600px" height="600px" />
            <p className="description">{videogame.description}</p>
            {
                videogame?.platforms?.map(platform => <p className="platform">{ platform + '-' }</p>)
            }

            <p className="description">Released: {videogame.year_start}</p>
            {
                videogame?.genres?.map(genre => <p className="description">{genre.name}</p>)
            }
            <p className="description">Rating: {videogame.rating}</p>
        </div>
        </body>
    ) : <div></div>
}

export default Detail;