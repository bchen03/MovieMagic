import React from "react";

export class SwimLane extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "The Magic Is Back!",
        }
    }

    render() {
        return (
            <div className="swimlane">
                <div className="uplane">
                    <img src="./images/movie-magic.jpg" />
                    <span>{this.state.title}</span>
                </div>
                <div className="downlane">
                    <span>Videos</span>
                    <span>Music</span>
                    <span>Administration</span>
                </div>
            </div>
        );
    }
}
