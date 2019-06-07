import React, {Component} from 'react';

export default class Weather extends Component {

    render(){
        const {title, temperature, city, country, humidity, description, error} = this.props;
        return(
            <div style={{'width': '100%'}}>
                <div className="Weather-title">{title}</div>
                <div className="Weather-content">
                    {city && country && <p className="Padding">Location: <span className="Weather-results">{city}, {country}</span></p>}
                    {temperature && <p className="Padding">Temperature: <span className="Weather-results">{temperature}°C</span></p>}
                    {humidity && <p className="Padding">Humidity: <span className="Weather-results">{humidity}%</span></p>}
                    {description && <p className="Padding">Conditions: <span className="Weather-results">{description}</span></p>}
                    {error && <p className="Weather-error">{error}</p>}
                </div>
            </div>
        );
    };
};