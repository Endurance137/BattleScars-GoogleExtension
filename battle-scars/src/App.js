import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import logo from "./logo.svg";
import "./App.scss";
import axios from "axios";

import SideDrawer from "./components/sideDrawer";
import MainContent from "./components/mainContent";

class App extends Component {
  defalutData = {
    backgroundImage: "/static/media/anders-jilden-89745-unsplash.046a9b55.jpg",
    drawerColor1: "#ff9e99",
    drawerColor2: "#8ea6b4",
    drawerIconTheme: "dark", // TODO: add me
    gredientColorEnabled: true,
    clocksEnabled: true,
    weathersEnabled: true,
    bookmarksEnabled: true
    // quoteCategory: "",
    // My Profile (My Details, Musics - Movies - Travels - Books - Bookmarks)
    // My Sticky Notes
    // My Smiles / Happiness
    // TODO: My TODOS, My Profile (My Details, Musics - Movies - Travels - Books)
    // TODO: How is your day? Happy Level, Sad Level, Medium. Overal my week, month, year smiles, family/friend/work people and life goals.
  };
  state = {
    currentLocation: undefined,
    data: {
      backgroundImage: this.defalutData.backgroundImage,
      drawerColor1: this.defalutData.drawerColor1,
      drawerColor2: this.defalutData.drawerColor2,
      drawerIconTheme: this.defalutData.drawerIconTheme,
      gredientColorEnabled: this.defalutData.gredientColorEnabled,
      clocksEnabled: this.defalutData.clocksEnabled,
      clockTimezones: [],
      weathersEnabled: this.defalutData.weathersEnabled,
      weatherLocations: [],
      bookmarksEnabled: this.defalutData.bookmarksEnabled,
      bookmarks: []
    }
  };

  componentDidMount() {
    // this.getStorageData(); TODO: implement
    this.getCurrentLocation();
  }

  getCurrentLocation = () => {
    // TODO: async await? Permission?
    axios
      // http://maps.googleapis.com: navigator.geolocation.getCurrentPosition(position => { position.coords.latitude/longitude } )
      .get(`http://ip-api.com/json`)
      .then(response => {
        console.log(response, "response from current location!");
        this.setState({ currentLocation: response.data });
        if (this.state.data.clocksEnabled) this.setClockLocations();
        if (this.state.data.weathersEnabled) this.setWeatherLocations();
      })
      .catch(error => {
        console.log(error, "Error getCurrentLocation!");
      });
  };

  setClockLocations = () => {
    // TODO: get from storage
    const data = { ...this.state.data };
    data.clockTimezones.push({
      _id: 0,
      timezone: this.state.currentLocation.timezone,
      dateTime: new Date()
    });
    data.clockTimezones.push({
      _id: 1,
      timezone: "America/Chicago"
    });
    this.setState({ data });
  };

  setWeatherLocations = () => {
    // TODO: get from storage
    const data = { ...this.state.data };
    data.weatherLocations.push({
      _id: 0,
      lat: this.state.currentLocation.lat,
      lon: this.state.currentLocation.lon,
      country: this.state.currentLocation.country,
      city: this.state.currentLocation.city
    });
    data.weatherLocations.push({
      _id: 1,
      lat: -0.13,
      lon: 51.51,
      country: "Netherlands",
      city: "Utrecht"
    });
    this.setState({ data });
  };

  /**
   * Save user changes
   * data are: Background image, General: drawer color picker (gradient, single), add more clock timezones, add more weather locations, enable/disable bookmarks, manage bookmarks, quote category, enable/disable clocks, enable/disable weathers
   * Set to defaut or update data and save it to localstorage
   */
  handleSettingSave = data => {
    console.log("Save Setting!");
  };

  render() {
    return (
      <React.Fragment>
        <main>
          <MainContent data={this.state.data} />
          {/* Search */}
        </main>
        <SideDrawer
          gredientColorEnabled={this.state.data.gredientColorEnabled}
          drawerColor1={this.state.data.drawerColor1}
          drawerColor2={this.state.data.drawerColor2}
          handleSettingSave={this.handleSettingSave}
        />
      </React.Fragment>
    );
  }
}

export default App;
