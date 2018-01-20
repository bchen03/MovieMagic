import React from "react";

export class MoviePanel extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            title: props.title,
            list: props.list
        }

        this.defaultWidth = props.width;
        this.defaultHeight = props.height;
        this.times = 25;
        this.interval = 5;
        this.increment = 5;
        this.lastSelectedIndex = null;

        this.imageResize = this.imageResize.bind(this);
        this.updateListState = this.updateListState.bind(this);
    }

    componentWillReceiveProps(newProps) {    
        //console.log(this.state.title, ', Component WILL RECIEVE PROPS!', newProps);
        this.setState({ list: newProps.list });
    }

    render() {
        return (
            <div className="panel">
                <div className="panel-title">
                    {this.state.title}
                </div>
                <div className="panel-container"> 
                    {
                        //this.state.list.map((item, index) => 
                        this.state.list.map((item, index) => 
                            <img src={"./images/" + item.image} 
                                key={index} 
                                width={item.width}
                                height={item.height}
                                className="panel-item"
                                onClick={(e) => this.imageResize(item, index, e)}
                                //onClick={(e) => this.imageResizeCurried(index)}
                                //onMouseOver={(e) => this.imageResize(item, index, e)}
                                //onMouseOut={(e) => this.imageRestore(item, index, e)}
                            />
                        )
                    }
                </div>
            </div>
        );
    }

    imageResize(item, index, event) {
        console.log("imageResize");

        localStorage.setItem("item", JSON.stringify(item));

        if  (item.width === this.defaultWidth && item.height === this.defaultHeight)
            this.animate(this.updateListState, item, index);
    }

    animate(fn, item, index) {
        let width = item.width;
        let height = item.height;
        let times = this.times;

        var ID = window.setInterval(function() {
            if (--times <= 0) {
                window.clearInterval(ID);
                this.lastSelectedIndex = index;
            }
            else {
                //console.log("times:", this.times, ", this.increment:", this.increment, "this.interval:", this.interval);
                fn(index, width += this.increment, height += this.increment);
            }
        }.bind(this), this.interval);
    };

    updateListState(index, width, height) {
        //console.log("updateListState, width:", width, ", height:", height, "initwidth:", initWidth, ", initheight:", initHeight, "index:", index);
        let newList = _.cloneDeep(this.state.list);

        // reset size on last animated item
        if (this.lastSelectedIndex !== null) {
            //console.log("lastSelectedIndex: ", this.lastSelectedIndex);
            newList[this.lastSelectedIndex].width = this.defaultWidth;
            newList[this.lastSelectedIndex].height = this.defaultHeight;
            this.lastSelectedIndex = null;
        }

        newList[index].width = width;
        newList[index].height = height;
        
        //console.log("list: ", this.state.list, ", newList: ", newList);
        this.setState({ list: newList });
    }

    /*
     * fn - function to be curried
     * 
     * Example call: this.curried(func, 1, 2, 3)
     * 
     * 1.   let args = Array.prototype.slice.call(arguments, 1);
     *  
     *      slice() returns a portion of an array - [1, 2, 3]
     * 
     * 2.   return function() {
     *          fn.apply(this, args.concat(Array.prototype.slice.call(arguments, 0)))
     *      }
     * 
     *      This has 3 parts:
     * 
     *      1. Array.prototype.slice.call(arguments, 0)
     *      
     *         Converts arguments object to array. The arguments are arguments passed to the newly "curried"
     *         function. For example, 
     * 
     *              var addOne = this.curried(add, 1);  // addOne() is the newly "curried" function
     *              var result = addOne(5);             // 5 is the arguments
     * 
     *      2. args.concat()
     * 
     *         Merges 2 arrays together. In this case: [1, 2, 3, 5]
     * 
     *      3. fn.apply()
     * 
     *         Call fn with arguments as an array. In this case: func([1,2,3,5])
     * 
    */
    curried(fn) {
        let args = Array.prototype.slice.call(arguments, 1);
        return function() {
            return fn.apply(this, args.concat(Array.prototype.slice.call(arguments, 0)));
        }
    };

    //  Implement imageResize function using currying. All arguments except index is curried.
    imageResizeCurried = this.curried(
        this.animate, 
        this.updateListState.bind(this) // func
    );
            
    
}
