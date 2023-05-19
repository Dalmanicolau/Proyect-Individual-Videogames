
const initialState = {
    videogames: [],
    genres: []
}

const rootReducer = (state= initialState, action) => {
    switch(action.type) {
        case 'GET_VIDEOGAMES': {
            return{
                ...state,
                videogames: action.payload
            } 
        }
        
        case 'GET_GENRES': {
            return{
                ...state,
                genres: action.payload
            }
        }

        case 'GET_GAME_GENRE': {
            return{
                ...state,
                videogames: action.payload
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
};

export default rootReducer;