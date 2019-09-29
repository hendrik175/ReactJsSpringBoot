import React from 'react'
import '../App.css';
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { reset, themes, List, ListItem, Divider, Window, Button, TextField, Toolbar,WindowHeader } from "react95";
class Notfound extends React.Component {
    render() {
        return (
            <div>
                <Window className="error" style={{ width: 400, height:150 }}>
                    <WindowHeader>error.exe</WindowHeader>
                    <img className="errorImg" src={require("../pictures/Error.png")}></img>
                    <span className="errorMsg">Sellist programmi ei leitud</span>
                </Window>
            </div>
        )
    }
}
export default Notfound;