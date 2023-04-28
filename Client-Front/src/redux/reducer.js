import { ADD_FAV, REMOVE_FAV, FILTER, ORDER } from "./action-types";

const initialState = {
    myFavorites: [],
    allCharactersFav: []
}


const reducer = (state = initialState, { type, payload }) => {
    switch( type ){
        case ADD_FAV:
            return {
                ...state,
                myFavorites: payload,
                allCharactersFav: payload
            }

        case REMOVE_FAV: 
            return {
                ...state,
                myFavorites: payload,
                allCharactersFav: payload
            }

        case FILTER:
            const allCharactersFavFiltered = state.allCharactersFav.filter(character => 
                character.gender === payload
            )
            return { 
                ...state,
                myFavorites: payload === 'allCharacters' ? [...state.allCharactersFav] : allCharactersFavFiltered
             }

        case ORDER:
            const allCharactersFavCopy = [...state.allCharactersFav];
            return {
                ...state,
                myFavorites: 
                payload === 'A' ? allCharactersFavCopy.sort((a, b) => a.id - b.id) : 
                allCharactersFavCopy.sort((a, b) => b.id - a.id)
            }

        default:
            return {...state}
    }
}


export default reducer;