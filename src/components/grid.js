import React from "react";

class Grid extends React.Component {
    render() {
        console.log("Grid:", this.props.children);
        return (
            React.Children.map(this.props.children, (child, i) => {
                return <div style={{backgroundColor: "cyan"}}>child</div>
            })
        );
    }
}

const GridHeader = props => props.children();    // render prop (using children)

class GridRow extends React.Component {
    render() {
        console.log("Row:", this.props.children);
        return (
            <div>
                <h3>
                    Name: {this.props.name}, &nbsp;&nbsp;
                    Value: {this.props.children}
                </h3>
            </div>
        );
    }
}

export { Grid, GridRow, GridHeader };
