import React from "react";
import ReactDOM from "react-dom";

import './css/styles.scss';

class App extends React.Component {
    render() {
        return (
            <div>Hello World!</div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
