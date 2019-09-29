import React from 'react'
import '../App.css';
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { themes, List, ListItem, Divider, Button  } from "react95";
class CityList extends React.Component {
    constructor(props) {
        super(props);
    }
    click = (name) => {
        this.props.deleteCity(name);
    }
    render() {
        return (
            <ThemeProvider theme={themes.default}>
            <List>
                {
                    this.props.cityList.map((item, key) => {
                        const rowLen = this.props.cityList.length;
                            return (
                                <ListItem key={key}>
                                    <b>{item.name} </b>
                                    {item.temp}°C,&nbsp;
                                    {item.windDirection} {item.windSpeed} m/s,
                                    Õhuniiskus {item.humidity}%
                                    <Button className="button" onClick={() => {this.click(item.name)}}>Kustuta</Button>
                                    {(rowLen === key + 1)?"":<Divider />}
                                </ListItem>
                            )
                    })
                }
            </List>
            </ThemeProvider>
        )
    }
}
export default CityList;