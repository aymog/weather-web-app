import React, {Component} from 'react';

export default class Form extends Component {

    render(){
        return(
            <div>
                <form onSubmit={this.props.getWeather}>
                    <input className="Margin" style={{"box-shadow": "1px 1px 5px #000000"}} type="text" name="city" placeholder="City..."/>
                    <input className="Margin" style={{"box-shadow": "1px 1px 5px #000000"}} type="text" name="country" placeholder="Country..."/>
                    <button className="Margin" >Submit</button>
                </form>
            </div>
        );
    };
};