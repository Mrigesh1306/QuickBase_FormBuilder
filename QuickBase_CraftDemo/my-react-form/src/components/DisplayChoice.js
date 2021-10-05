import React,{Component}  from 'react';

class DisplayChoice extends Component{

    constructor(props) {
        super(props);

        // this.state = {
        //     selected : false
        // }
    }


    render() {
        return (
            <div className={"row"}>
                <div className={'col-sm-3'}></div>
                <div className={'col-sm-6'}>
                    <h5>{this.props.choice.title}</h5>
                </div>
                <div className={'col-sm-3'}></div>
            </div>


        );
    }
}

export default DisplayChoice;