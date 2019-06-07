import React, {Component} from 'react';

export default class Weather extends Component {

    render(){
        const {temperature, city, country, humidity, description, error} = this.props;
        return(
            <div>
                {city && country && <p>Location: {city}, {country}</p>}
                {temperature && <p>Temperature: {temperature}°C</p>}
                {humidity && <p>Humidity: {humidity}</p>}
                {description && <p>Conditions: {description}</p>}
                {error && <p>{error}</p>}
            </div>
        );
    };
};