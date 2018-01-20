import React from "react";

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { MoviePanel } from './moviepanel';

import {fetchMovies} from '../actions/action-movies';

export class Movies extends React.Component {

    constructor(props) {
        super(props);

        console.log("Movies props: ", props);
        this.width = props.width ? Number.parseInt(props.width) : 200;
        this.height = props.height ? Number.parseInt(props.height) : 150;
        console.log("Movies:", this.width, ",", this.height);

    }

    renderMoviePanels() {
        if (!this.props.data || !this.props.data.list) {
            return (
                <div>
                    <i>Loading data. Please wait...</i>
                    {/* <button onClick={() => this.props.fetchMovies() }>Refresh Movies</button> */}
                </div>
            );
        }

        return (
            <div>
                <MoviePanel title="Top Five" list={this.props.data.list.topFive} width={this.width} height={this.height} />
                <MoviePanel title="Latest" list={this.props.data.list.latest} width={this.width} height={this.height} />
                <MoviePanel title="Action" list={this.props.data.list.action} width={this.width} height={this.height} />
                <MoviePanel title="Drama" list={this.props.data.list.drama} width={this.width} height={this.height} />
            </div>
        );
    }

    render() {
        return (
            <div className="app-column-content">
                {this.renderMoviePanels()}
            </div>
        );
    }
    
}

// Maps redux state store to this.props
// "state.movies": "state" is the global Redux state object, and "movies" is the reducer key in allReducers; 
// "data" is mapped to props, i.e., this.props.data
function mapStateToProps(state) {
    console.log('Movies.mapStateToProps:', state);
    return {
        data: state.movies  
    };
}

// Function to dispatch actions from this component 
// You can now post an action through this.props.fetchMovies()
// Look at renderMoviePanels() above for an example
function matchDispatchToProps(dispatch) {
    return bindActionCreators({fetchMovies: fetchMovies}, dispatch);
}

// Connect both functions above to Redux
// It's important to use "export default" here so components that use this Redux container are properly hooked up
// In the top level index.js, here's the import: 
//      import App from './components/app.js'
// If we exported the App class above then Redux would not be properly dispatched
export default connect(mapStateToProps, matchDispatchToProps)(Movies);

