
// Movie reducer
// Pure function that returns new movie state object 
// Look at allReducers to see top-level Redux store state
export function moviesReducer(state={isFetching: false}, action) {
    console.log("moviesReducer state:", state, ", action:", action );

    switch (action.type)  {
        case "MOVIES_REQUESTED":
            //return Object.assign({}, state, { isFetching: true });
            return { ...state, isFetching: true };
        case "MOVIES_RECEIVED":
            //return Object.assign({}, state, { isFetching: false, data: action.payload });
            return { ...state, isFetching: false, list: action.payload };
    }
    return state;
};
