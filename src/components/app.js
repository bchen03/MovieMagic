import React from "react";

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { Header } from './header';
import { SwimLane } from './swimlane';
import { Sidenav } from './sidenav';
import Movies from './movies';
import { MoviePanel } from './moviepanel';

import { Grid, GridRow, GridHeader } from './grid';     // Use children API

// import {fetchMovies} from '../actions/action-movies';

export class App extends React.Component {
    
    constructor(props) {
        super(props);

        console.log("App props: ", props);
        this.width = props.width ? Number.parseInt(props.width) : 200;
        this.height = props.height ? Number.parseInt(props.height) : 150;
        console.log("App:", this.width, ",", this.height);

        this.state = {
            greeting: "Movie Magic - The leading movie app on the internet!",
            topFive: [],
            latest: [],
            action: [],
            drama: []                  
        };

        // this.state2 = {
        //     greeting: "Movie Magic - The leading movie app on the internet!",
        //     topFive:  [
        //         { title: "Carlitos Way", image: "carlitos-way.jpg", width: this.width, height: this.height },
        //         { title: "From Russia With Love", image: "from-russia-with-love.jpg", width: this.width, height: this.height },
        //         { title: "Scarface", image: "scarface.jpg", width: this.width, height: this.height },
        //         { title: "The Godfather", image: "the-godfather.jpg", width: this.width, height: this.height },
        //         { title: "The Good, the Bad, and the Ugly", image: "the-good-bad-ugly.jpg", width: this.width, height: this.height }
        //     ],
        //     latest: [
        //         { title: "Phantom Menace", image: "phantom-menace.jpg", width: this.width, height: this.height },
        //         { title: "Pulp Fiction", image: "pulp-fiction.jpg", width: this.width, height: this.height },
        //         { title: "Titanic", image: "titanic.jpg", width: this.width, height: this.height },
        //     ],
        //     action: [
        //         { title: "Phantom Menace", image: "phantom-menace.jpg", width: this.width, height: this.height },
        //         { title: "Raiders of the Lost Ark", image: "raiders-of-the-lost-ark.jpg", width: this.width, height: this.height },
        //         { title: "Top Gun", image: "top-gun.jpg", width: this.width, height: this.height },
        //         { title: "From Russia With Love", image: "from-russia-with-love.jpg", width: this.width, height: this.height }
        //     ],
        //     drama: [
        //         { title: "The Godfather II", image: "the-godfather-2.jpg", width: this.width, height: this.height },
        //         { title: "The Exorcist", image: "the-exorcist.jpg", width: this.width, height: this.height },
        //         { title: "The Omen", image: "the-omen.jpg", width: this.width, height: this.height },
        //         { title: "The Good, the Bad, and the Ugly", image: "the-good-bad-ugly.jpg", width: this.width, height: this.height }
        //     ]
        // };

    }

    componentDidMount() {
        //console.log('App Component DID MOUNT!')
        //this.loadMovies();
    }

    loadMovies() {
        let that = this;

        fetch("http://localhost:8083/api/v1/movies/homepage")
        .then(response => {

            if (response.status !== 200) {
                console.error("fetch status: " + response.status);
                return;
            }

            console.log("fetch success");

            response
            .json()
            .then(data => {
                console.log("data:", data);
                console.log("fetch this:", this);

                that.setState({
                    topFive: data.topFive,
                    latest: data.latest,
                    action: data.action,
                    drama: data.drama
                });
            });
        })
        .catch(err => {
            console.log("fetch error:", err);
        });
    }

    // Used to render movie data 
    renderMoviePanels() {
        if (!this.props.data || !this.props.data.list) {
            return (
                <div className="app-column-content">
                    <i>Loading data. Please wait...</i>
                    {/* <button onClick={() => this.props.fetchMovies() }>Refresh Movies</button> */}
                    </div>
            );
        }

        return (
            <div className="app-column-content">
                <MoviePanel title="Top Five" list={this.props.data.list.topFive} width={this.width} height={this.height} />
                <MoviePanel title="Latest" list={this.props.data.list.latest} width={this.width} height={this.height} />
                <MoviePanel title="Action" list={this.props.data.list.action} width={this.width} height={this.height} />
                <MoviePanel title="Drama" list={this.props.data.list.drama} width={this.width} height={this.height} />
            </div>
        );
    }

    // React will invoke on initial render and also by Redux when movie action/reducer is dispatched
    render() {
        console.log("App render() called: data:", this.props.data);
        return (
            <div className="app"> 
                <Header />
                <SwimLane />
                <div className="app-content">
                    <div className="app-columns">
                        <Movies />
                        {/* {this.renderMoviePanels()} */}
                        <div className="app-column-side">
                            <Sidenav />
                        </div>
                    </div>

                    <div className="app-columns">
                        <div className="py-3">
                            <Grid>
                                <GridHeader>
                                    { () => <h3>Rows below!</h3> }
                                </GridHeader>
                                <GridRow name="Row 1">This is Row 1</GridRow>
                                <GridRow name="Row 2">This is Row 2</GridRow>
                                <GridRow name="Row 3">This is Row 3</GridRow>
                                <GridRow name="Row 4">This is Row 4</GridRow>
                            </Grid>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
    
// Maps redux state store to this.props
// "state.movies": "state" is the global Redux state object, and "movies" is the reducer key in allReducers; 
// "data" is mapped to props, i.e., this.props.data
// function mapStateToProps(state) {
//     console.log('Movies.mapStateToProps:', state);
//     return {
//         data: state.movies  
//     };
// }

// Function to dispatch actions from this component 
// You can now post an action through this.props.fetchMovies()
// Look at renderMoviePanels() above for an example
// function matchDispatchToProps(dispatch) {
//     return bindActionCreators({fetchMovies: fetchMovies}, dispatch);
// }

// Connect both functions above to Redux
// It's important to use "export default" here so components that use this Redux container are properly hooked up
// In the top level index.js, here's the import: 
//      import App from './components/app.js'
// If we exported the App class above then Redux would not be properly dispatched
// export default connect(mapStateToProps, matchDispatchToProps)(App);

