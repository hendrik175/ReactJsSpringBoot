import React from 'react'
import axios from 'axios'
import CityList from './CityList';
import '../App.css';
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { reset, themes, List, ListItem, Divider, Window, Button, TextField, Toolbar,WindowHeader } from "react95";

const ResetStyles = createGlobalStyle`
  ${reset}
`;
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'Tallinn',
            cityList: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteCity = this.deleteCity.bind(this);
    }
    componentWillMount() {
        this.getCityData();
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleSubmit(event) {
        //alert('A name was submitted: ' + this.state.value);
        this.addCity(this.state.value);
        this.getCityData();
        this.setState({value:""})
        event.preventDefault();
    }
    addCity(_city){
        //console.log(_city);
        axios.post('http://192.168.1.178:8080/weatherapi/add', {
            name: _city
        })
        .then((response) => {
            //console.log(response);
            this.getCityData();

        }, (error) => {
            console.log(error);
        });
    }
    deleteCity(name){
        this.state.cityList.forEach(el => console.log(el));
        const cityList = this.state.cityList.filter(city => city.name !== name);
        this.setState({cityList});
        axios.post('http://192.168.1.178:8080/weatherapi/delete', {
            name: name
        })
            .then((response) => {
                //console.log(response);
                this.getCityData();
            }, (error) => {
                console.log(error);
            });
        //this.setState({cityList: this.state.cityList.filter(city => city.name !== name)});
    }
    getCityData(){
        axios.get('http://192.168.1.178:8080/weatherapi/all')
            .then((response) => {
                const cityList = [];
                response.data.map(city => cityList.push({
                    name: city.name,
                    temp: city.temp,
                    windDirection: city.windDirection,
                    humidity: city.humidity,
                    windSpeed: city.windSpeed
                }));
                this.setState({cityList})
                //console.log(this.state.cityList);
            }, (error) => {
                console.log(error);
            });
    }


    render() {
        return (
            <div>
                <ThemeProvider theme={themes.default}>
                    <Window className="window">
                        <WindowHeader>Maailma_ilm.exe</WindowHeader>
                        <form onSubmit={this.handleSubmit}>
                            <Toolbar className="div">
                            <TextField className="textField" type="text" value={this.state.value}  onChange={this.handleChange}/> <Button className="addButton" onClick={this.handleSubmit}>Lisa</Button>
                            </Toolbar>
                        </form>
                        <CityList cityList={this.state.cityList} deleteCity={this.deleteCity}/>
                    </Window>
                </ThemeProvider>
            </div>
        )
    }
}
export default App;