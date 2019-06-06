import React, {Component} from 'react';

import Form from './Form';
import Weather from './Weather';

const OWM_API_KEY = 'e1ec42b32ae434e0f059403435f5f2c0';

export default class Main extends Component {

    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined,
    };

    getWeatherOWM = async (e) => {
        e.preventDefault(); // to stop the page from refreshing

        //get input from form
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;

        //API call
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${OWM_API_KEY}`)
        .then((response) => {
            return response.json();
        }).catch((error)=>{
            console.log(error);
        });

        console.log(data);

        if(data.cod !== "404"){ //City was found
            this.setState({
                temperature: data.main.temp,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                error:''
            });
        }else{ // city was not found
            this.setState({
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                error: data.message
            });
        }
    
    };

    render(){
        return(
            <div>
                <Form getWeather={this.getWeatherOWM}/>
                <Weather {...this.state}/>
            </div>
        );
    };
};