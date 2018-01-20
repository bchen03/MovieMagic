import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from 'react-redux'
import {createStore, applyMiddleware, combineReducers, bindActionCreators} from 'redux';
import thunkMiddleware from 'redux-thunk';

import _ from "lodash"
import "./css/styles.scss";

// import {App} vs import App
// "import {App}"" is used to export by name, i.e., "export class App"
// "import App" is used when using default export, i.e., "export default App"; there can only be one default export per file
// For Redux, use "import App" for calls to connect(), i.e., "export default connect(mapStateToProps, matchDispatchToProps)(Movies);"

import {App} from './components/app';
import {fetchMovies} from './actions/action-movies';
import {allReducers} from './reducers/reducer-all';

// file-loader needs this to copy images to /dist/images
function requireAll(r) { 
    r.keys().forEach(r); 
}
requireAll(require.context('./images/', true));


// Redux store
const store = createStore(
    allReducers, 
    {},                 // initial state
    applyMiddleware(
        thunkMiddleware
    )
);

// Display updates to store
// This is normal Redux way to know when store has changed
// React/Redux uses connect() to map dispatch actions to React container props
store.subscribe(() => {
    console.log("Store updated: ", store.getState());
});


// Initial react render
// Redux needs <Provider> tag to associate redux store with components (and all subcomponents)
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);


// Dispatch initial action to load movies in <App> container
store.dispatch(fetchMovies()).then(() => console.log("store.dispatch fetchMovies: ", store.getState()))


