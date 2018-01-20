import {combineReducers} from 'redux';
import {moviesReducer} from './reducer-movies';

// Top-level Redux store state
// Maps individual container states into one top-level state object
// React/Redux containers will use mapStateToProps() to map reducer state objects to container props
// I.e., in App.js, "state.movies" reducer result state is mapped to App's "this.props.data".
//
// function mapStateToProps(state) {
//     console.log('Movies.mapStateToProps:', state);
//     return {
//         data: state.movies  
//     };
// }

export const allReducers = combineReducers({
    movies: moviesReducer
});
