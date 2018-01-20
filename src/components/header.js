import React from "react";

export class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            nav: [
                { image: "dvd-disk.jpg", width: 45, height: 45 }
                ,{ image: "magic-hat.jpg", width: 45, height: 45 }
                //,{ image: "projector.jpg", width: 45, height: 45 }
                //,{ image: "pencils.jpg", width: 45, height: 45 }
            ],

            signIn: "Sign Up/Login",
            support: "Support"
        }
    }

    render() {
        return (
            <div className="header">
                {
                    this.state.nav.map((item, index) => 
                        <img src={"./images/" + item.image} 
                            key={index} 
                            width={item.width}
                            height={item.height}
                            className="left-header"
                        />
                    )
                }
                   
                <div className="right-header">{this.state.signIn}</div>
                <div className="right-header">{this.state.support}</div>
            </div>
        );
    }
}
