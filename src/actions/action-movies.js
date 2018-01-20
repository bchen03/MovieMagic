
export const requestMovies = () => {
    console.log('requestMovies action');
    return {
        type: "MOVIES_REQUESTED"
    };
};

export const receiveMovies = (json) => {
    console.log('receiveMovies action:', json);
    return {
        type: "MOVIES_RECEIVED",
        payload: json
    };
};

// Async action to invoke API
// Does initial dispatch to request movie and then a second dispatch when data has been received
export const fetchMovies = () => {
    console.log("fetchMovies");
    return function(dispatch) {
        dispatch(requestMovies);
        return fetch("http://localhost:8083/api/v1/movies/homepage")
            .then(
                response => response.json(), 
                error => console.log("An error occurred: ", error)
            )
            .then(
                json => dispatch(receiveMovies(json))
            )
    }
};
