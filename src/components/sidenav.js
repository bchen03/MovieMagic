import React from "react";

export class Sidenav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ads: [
                "hallmark.png",
                "disney-rewards.png",
                "lifetime-club.jpg",
                "redbox.jpg",
                "movie-tickets.png",
                "netflix.jpg"
            ]
        }
    }

    render() {
        return (
            <div className="sidenav">
                {
                    this.state.ads.map((item, index) => 
                        <div className="sidenav-content" key={index} >
                            <img src={"./images/" + item} 
                                width="100%"
                                height="100%"
                            />
                        </div>
                    )
                }
            </div>
        );
    }
}
