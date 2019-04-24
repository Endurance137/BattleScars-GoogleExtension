import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import "./../styles/searchBox.scss";
import CustomSelect from "./common/customSelect";

class SearchBox extends Component {
  searchEngineOptions = [
    {
      _id: 1,
      name: "Google",
      image: require("./../assets/search-engines/google.png")
    },
    {
      _id: 2,
      name: "Bing",
      image: require("./../assets/search-engines/bing.png")
    }
    // {
    //   _id: 3,
    //   name: "Wikipedia",
    //   image: require("./../assets/search-engines/wikipedia.png")
    // },
    // {
    //   _id: 4,
    //   name: "Yahoo",
    //   image: require("./../assets/search-engines/yahoo.png")
    // }
  ];

  state = {
    selectedEngine: this.searchEngineOptions[0],
    input: ""
  };

  handleSelectionChange = option => {
    this.setState({ selectedEngine: this.findEngine(option.target.value)[0] });
  };

  findEngine = value => {
    return this.searchEngineOptions.filter(engine => {
      return engine._id === value;
    });
  };

  handleInputChange = input => {
    this.setState({ input: input.target.value });
  };

  handleSearch = () => {
    if (typeof window !== "undefined") {
      window.location.href =
        "https://www." +
        this.state.selectedEngine.name +
        ".com/search?q=" +
        this.state.input;
    }
  };

  render() {
    return (
      <Grid item>
        <Paper className="search-container" elevation={1}>
          {/* choose search engine  */}
          <CustomSelect
            options={this.searchEngineOptions}
            defaultSelection={this.state.selectedEngine}
            selectionChanged={this.handleSelectionChange}
          />
          <Divider className="divider" />
          {/* search input */}
          <InputBase
            className="search__input"
            placeholder="Search with your favourite engine :)"
            onChange={this.handleInputChange}
            onKeyDown={event => {
              if (event.key === "Enter") {
                this.handleSearch();
              }
            }}
          />
          <Divider className="divider" />
          {/* search btn  */}
          <IconButton
            className="search__btn"
            aria-label="Search"
            onClick={this.handleSearch}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>
    );
  }
}

export default SearchBox;
