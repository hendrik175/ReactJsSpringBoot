import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link, Switch, BrowserRouter } from "react-router-dom";
import WeatherQueryForm from './components/WeatherQueryForm';
import WeatherApp from './components/WeatherApp';
import Notfound from './components/Notfound';

import './App.css';
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { reset, themes, List, ListItem, Divider, Window, Button, TextField, Toolbar,WindowHeader,AppBar, Bar } from "react95";
function App() {
  return (
      <BrowserRouter>
    <div className="App">
        <ThemeProvider theme={themes.default}>
            <Window className="mainWindow">
                <AppBar>
                    <Toolbar>
                        <Button variant="menu" size="sm"><Link to="/Part1"><span>Esimene osa</span></Link></Button><Bar/>
                        <Button variant="menu" size="sm"><Link to="/Part2"><span>Teine osa</span></Link></Button>
                    </Toolbar>
                </AppBar>
            <Switch>
                <Route exact path="/" component={WeatherApp} />
                <Route path="/Part1" component={WeatherQueryForm} />
                <Route path="/Part2" component={WeatherApp} />
                <Route component={Notfound} />
            </Switch>
            </Window>
        </ThemeProvider>
    </div>
      </BrowserRouter>
  );
}
export default App;
