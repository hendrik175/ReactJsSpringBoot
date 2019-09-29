import React from 'react'
import axios from 'axios'
import {ThemeProvider} from "styled-components";
import { reset, themes, List, ListItem, Divider, Window, Button, TextField, Toolbar,WindowHeader } from "react95";
import '../App.css';
class WeatherQueryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Tallinn',
            api_key: 'd67efe84a5d25723b640a06e4fd5ed39',
            wind: [],
            wind_direction: '',
            humidity: '',
            temperature: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    convertDirToStr(wind_direction){
        const val = (wind_direction % 360);
        const index = Math.round(val / 45) + 1;
        const ilmakaared = ['Tuulesuund on Nord','Kirdetuul','Idatuul','Kagutuul','Lõunatuul','Edelatuul','Läänetuul','Loodetuul'];
        return ilmakaared[index];
    }
    makeApiCall(){
        const kelvinToCelsius = require('kelvin-to-celsius');
        axios.get('https://api.openweathermap.org/data/2.5/weather?q='
            + this.state.value + '&APPID='
            + this.state.api_key)
            .then(res => {
                console.log(res.data);
                const wind = res.data.wind;
                const wind_direction = this.convertDirToStr(res.data.wind.deg);
                const humidity = res.data.main.humidity;
                const temperature = kelvinToCelsius(res.data.main.temp);
                console.log(wind_direction + "" + wind.deg);
                this.setState({ wind });
                this.setState({wind_direction});
                this.setState({humidity});
                this.setState({temperature})
            })
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleSubmit(event) {
        this.makeApiCall();
        event.preventDefault();
    }

    render(){
        return(
            <div>
                <ThemeProvider theme={themes.default}>
                    <Window className="WeatherQueryForm">
                        <WindowHeader>Ilmaotsing.exe</WindowHeader>

                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Linn: <TextField type="text" value={this.state.value} onChange={this.handleChange} />
                            </label>
                            <Button type="submit">Otsi</Button>
                        </form>
                            <List>
                                <ListItem>Temperatuur {this.state.temperature}</ListItem>
                                <ListItem>{this.state.wind_direction}</ListItem>
                                <ListItem>Tuulekiirus {this.state.wind.speed} m/s</ListItem>
                                <ListItem>Õhuniiskus {this.state.humidity}</ListItem>
                            </List>
                    </Window>
                </ThemeProvider>
            </div>
        );
    }
}
export default WeatherQueryForm;
