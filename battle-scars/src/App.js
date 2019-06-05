import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import logo from "./logo.svg";
import "./App.scss";
import axios from "axios";

import SideDrawer from "./components/sideDrawer";
import MainContent from "./components/mainContent";

class App extends Component {
  // TODO: set global attributes
  defalutData = {
    backgrundImage: "/static/media/anders-jilden-89745-unsplash.046a9b55.jpg",
    drawerColor1: "#ffffba",
    drawerColor2: "#ffffba",
    gredientEnabled: true,
    clocksEnabled: true,
    weathersEnabbled: true,
    bookmarksEnabled: true
    // quoteCategory: "",
    // My Profile (My Details, Musics - Movies - Travels - Books - Bookmarks)
  };
  state = {
    currentLocation: undefined,
    data: {
      backgrundImage: this.defalutData.backgrundImage,
      drawerColor1: this.defalutData.drawerColor1,
      drawerColor2: this.defalutData.drawerColor2,
      gredientEnabled: this.defalutData.gredientEnabled,
      clocksEnabled: this.defalutData.clocksEnabled,
      clockLocations: [],
      weathersEnabbled: this.defalutData.weathersEnabbled,
      weatherLocations: [],
      bookmarksEnabled: this.defalutData.bookmarksEnabled,
      bookmarks: []
    }
  };

  componentDidMount() {
    this.getCurrentLocation();
    this.setClockLocations();
    this.setWeatherLocations();
  }

  getCurrentLocation = () => {
    // TODO: async await?
    axios
      // http://maps.googleapis.com: navigator.geolocation.getCurrentPosition(position => { position.coords.latitude/longitude } )
      .get(`http://ip-api.com/json`)
      .then(response => {
        console.log(response, "response from current location!");
        this.setState({ currentLocation: response.data });
      })
      .catch(error => {
        console.log(error, "Error getCurrentLocation!");
      });
  };

  setWeatherLocations = () => {
    const data = [...this.state.data];
    data.weatherLocations.push({
      _id: 0,
      lat: this.state.currentLocation.lat,
      lon: this.state.currentLocation.lon,
      country: this.state.currentLocation.country,
      city: this.state.currentLocation.city
    });
    // TODO: get other weather locations from storage
    data.weatherLocations.push({
      _id: 1,
      lat: -0.13,
      lon: 51.51,
      country: "Netherlands",
      city: "Utrecht"
    });
    this.setState({ data });
  };

  setClockLocations = () => {
    const data = [...this.state.data];
    data.clockLocations.push({
      _id: 0,
      timezone: this.state.currentLocation.timezone,
      time: new Date()
    });
    // TODO: get other weather locations from storage
    data.clockLocations.push({
      _id: 1,
      timezone: "America/Chicago"
    });
    this.setState({ data });
  };

  /**
   * Save user changes
   * data are: Background image, General: drawer color picker (gradient, single), add more clocks, add more weathers, enable/disable bookmarks, manage bookmarks, quote category, enable/disable clocks, enable/disable weathers
   * Set to defaut or update data and save it to localstorage
   */
  handleSettingSave = data => {
    console.log("Save Setting!");
  };

  render() {
    return (
      <React.Fragment>
        <main>
          <MainContent date={this.state.data} />
          {/* Search */}
        </main>
        <SideDrawer
          menuItems={this.menuItems}
          handleSettingSave={this.handleSettingSave}
        />
      </React.Fragment>
    );
  }
}

export default App;
