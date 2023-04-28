import Card from "./Card";
import { connect, useDispatch } from "react-redux";
import { filterCards, orderCards } from "../redux/actions";
import { useState } from "react";

const Favorites = ({ myFavorites }) => {

    const [aux, setAux] = useState(false);

    const dispatch = useDispatch();
    
    const handleOrder = (event) => {
        dispatch(orderCards(event.target.value));
        setAux(true);
    }

    const handleFiltered = (event) => {
        dispatch(filterCards(event.target.value));
    }

    return (
        <div>
            <select onChange={handleOrder}>
                <option value="A">Ascendente</option>
                <option value="D">Descendente</option>
            </select>
            <select onChange={handleFiltered}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Genderless">Genderless</option>
                <option value="unknown">unknown</option>
                <option value="allCharacters">allCharacters</option>
            </select>

            {
                myFavorites?.map(fav => {
                    return (
                        <Card
                            key={fav.id}
                            id={fav.id}
                            name={fav.name}
                            status={fav.status}
                            species={fav.species}
                            gender={fav.gender}
                            origin={fav.origin}
                            image={fav.image}
                            onClose={fav.onClose}
                        />
                    )
                })
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        myFavorites: state.myFavorites
    }
}

export default connect(
    mapStateToProps,
    null
)(Favorites);