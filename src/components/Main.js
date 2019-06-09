import React, {Component} from 'react';

import {Container, Row, Col} from 'react-bootstrap';

import Form from './Form';
import Weather from './Weather';
import countries from '../countries';

const OWM_API_KEY = 'e1ec42b32ae434e0f059403435f5f2c0';
const ACCU_API_KEY = 'fNLJr2vtFMU050NiKzgS7REfh8UCOY7G';

export default class Main extends Component {

    state = {
        temperatureOWM: undefined,
        cityOWM: undefined,
        countryOWM: undefined,
        humidityOWM: undefined,
        descriptionOWM: undefined,
        errorOWM: undefined,
        temperatureACCU: undefined,
        cityACCU: undefined,
        countryACCU: undefined,
        humidityACCU: undefined,
        descriptionACCU: undefined,
        errorACCU: undefined,
    };

    getWeatherOWM = async (city, country) => {

        let url = '';
        if(country === ''){
            url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OWM_API_KEY}&units=metric`;
        }else{
            url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${OWM_API_KEY}&units=metric`;
        }
        //API call
        const data = await fetch(url)
        .then((response) => {
            return response.json();
        }).catch((error)=>{
            console.log(error);
        });

        console.log(data);

        if(data.cod !== "404"){ //City was found
            this.setState({
                temperatureOWM: data.main.temp,
                cityOWM: data.name,
                countryOWM: data.sys.country,
                humidityOWM: data.main.humidity,
                descriptionOWM: data.weather[0].description,
                errorOWM:''
            });
        }else{ // city was not found
            this.setState({
                temperatureOWM: undefined,
                cityOWM: undefined,
                countryOWM: undefined,
                humidityOWM: undefined,
                descriptionOWM: undefined,
                errorOWM: data.message
            });
        }
    };

    getAccuData = async (locationKey) =>{
        const accuData = await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${ACCU_API_KEY}&details=true`)
        .then((response) => {
            return response.json();
        }).catch((error)=>{
            console.log(error);
        });
        return accuData[0]; //return the first element only
    }

    getCode = (country) => {
        let code = undefined;
        if(country === ''){
            return code;
        }
        countries.forEach(element => {
            let elCountry = element.country.toLowerCase();
            let c = country.toLowerCase();
            if(elCountry.includes(c)){
                code = element.abbreviation.toLowerCase();
            }
        });
        return code;
    }
    getWeatherAccu = async (city, country) => {

        const countryCode = this.getCode(country);
        let locationInfo = undefined;
        let url = '';
        //API call
        if(countryCode === undefined){
            url = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${ACCU_API_KEY}&q=${city}`;
        }else{
            url = `https://dataservice.accuweather.com/locations/v1/cities/${countryCode}/search?apikey=${ACCU_API_KEY}&q=${city}`;
        }
        const data = await fetch(url)
        .then((response) => {
            return response.json(); 
        }).then((response) => {
            locationInfo = response[0];
            return locationInfo.Key;
        }).then((response) => {
            return this.getAccuData(response);
        }).catch((error)=>{
            console.log(error);
        });

        console.log(data);

        if(data !== undefined){ //City was found
            this.setState({
                temperatureACCU: data.Temperature.Metric.Value,
                cityACCU: locationInfo.EnglishName, 
                countryACCU: locationInfo.Country.ID, //locationInfor.Country.EnglishName, cn be used for full name of the country
                humidityACCU: data.RelativeHumidity,
                descriptionACCU: data.WeatherText,
                errorACCU:''
            });
        }else{ // city was not found
            this.setState({
                temperatureACCU: undefined,
                cityACCU: undefined,
                countryACCU: undefined,
                humidityACCU: undefined,
                descriptionACCU: undefined,
                errorACCU: 'city not found'
            });
        }
    
    };

    getWeather = (e) =>{
        e.preventDefault();// to stop the page from refreshing

        //get input from form
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;

        this.getWeatherOWM(city, country);
        this.getWeatherAccu(city, country);
    }

    render(){
        return(
            <div className="Main-div">
                <div className="Margin">
                    <Form getWeather={this.getWeather}/>
                </div>
                <Container>
                    <Row>
                        <Col className="Weather">
                            <Weather title={'Open Weather Map'} temperature={this.state.temperatureOWM} city={this.state.cityOWM} country={this.state.countryOWM}
                            humidity={this.state.humidityOWM} description={this.state.descriptionOWM} error={this.state.errorOWM}/>
                        </Col>
                        <Col className="Weather">
                            <Weather title={'AccuWeather'} temperature={this.state.temperatureACCU} city={this.state.cityACCU} country={this.state.countryACCU}
                            humidity={this.state.humidityACCU} description={this.state.descriptionACCU} error={this.state.errorACCU}/>
                        </Col>
                        
                    </Row>
                </Container>
            </div>
        );
    };
    
};