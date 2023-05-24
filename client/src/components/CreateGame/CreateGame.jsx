import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createVideogame, getGenres } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import validation from '../validation'
import './CreateGame.css'

const CreateGame = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector((state) => state.genres);
    const [ genresToShow, setGenresToShow ] = useState([]);

    const [input, setInput] = useState({
        name: "",
        description: "",
        platforms: "",
        image: "",
        year_start: '',
        rating: 0,
        genres: []
    })

    const [errors, setErrors] = useState({
        name: "",
        description: "",
        platforms: "",
        image: "",
        year_start: '',
        rating: 0,
        genres: []
    })


    const handlerChange = (event) => {
        setInput({
            ...input,
            [event.target.name] : event.target.value
        });

        setErrors(validation({ ...input, [event.target.name]: event.target.value}))
    }
    
    const handleSelect = (event) => {
        const { target: { value } } = event;
        const genre = genres.find(genre => genre.id === value);

        if (input.genres.includes(value)) {
            alert('No puedes seleccionar el mismo genero dos veces')
            
            return;
            }

        setGenresToShow([
            ...genresToShow,
            genre.name,
        ]);


        setInput({
            ...input,
            genres: [...input.genres, value]
        });
    }


const handlerSubmit = (event) => {
    event.preventDefault();

    dispatch(createVideogame(input));

    alert("Vieojuego creado con exito!");

    setInput({
        name: "",
        description: "",
        platforms: "",
        image: "",
        year_start: '',
        rating: 0,
        genres: []
    });
    history.push('/home');
}

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch]);

    return(
        <div>
            <Link to= 'home'><button className='button' >Back</button></Link>
            <h1 className='title1'>Create your game!</h1>
            <form onSubmit={(event) => handlerSubmit(event)}>
                <div>
                    <div>
                        <label>Nombre:</label>
                        <input type= "text" value= {input.name} name="name" onChange={(event) =>handlerChange(event)}></input>
                        {errors.name ? <p className= 'error'>{errors.name}</p>:''}
                    </div>
                    <div>
                        <label>Description:</label>
                        <input type= "text" value= {input.description} name="description" onChange={(event) =>handlerChange(event)}></input>
                        {errors.description ? <p className= 'error'>{errors.description}</p>:''}
                    </div>
                    <div>
                        <label>Platform:</label>
                        <input type= "text" value= {input.platforms} name="platforms" onChange={(event) =>handlerChange(event)}></input>
                    </div>
                    <div>
                        <label>Imagen:</label>
                        <input type= "text" value= {input.image} name="image"onChange={(event) =>handlerChange(event)}></input>
                    </div>
                    <div>
                        <label>Año de Creacion:</label>
                        <input type= "date" placeholder='YYYY-MM-DD' value= {input.year_start} name="year_start" onChange={(event) =>handlerChange(event)}></input>
                    </div>
                    <div>
                        <label>Rating:</label>
                        <input type= "number" value= {input.rating} name="rating"onChange={(event) =>handlerChange(event)}></input>
                        {errors.rating? <p className= 'error'>{errors.rating}</p>:''}
                    </div>
                    <div>
                        <label>Genero:</label>
                        <select onChange={(event) =>handleSelect(event)}>
                            {
                                genres.map((genre) => {
                                    return <option value={genre.id}>{genre.name}</option>
                                })
                            }
                        </select>
                        {errors.rating? <p>{errors.rating}</p>:''}
                        <ul><li>{genresToShow.map(genre => genre + " ,")}</li></ul>
                    </div>
                    <button className='button2' disabled= {errors.name || errors.rating
                || errors.description || !input.platforms} type= "submit">Crear Personaje</button>
                </div>
            </form>
        </div>
    )
}


export default CreateGame;