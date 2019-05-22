import React, { Component } from "react";
import "./../../styles/customSlider.scss";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

class CustomSlider extends Component {
  state = {
    currentIndex: 0,
    items: this.props.items
  };

  handleChange = goNext => {
    // endless loop navigation
    const items = [...this.state.items];
    // hide current item
    items[this.state.currentIndex].show = false;
    // Go Next, show next item
    if (goNext) {
      if (items[this.state.currentIndex + 1]) {
        items[this.state.currentIndex + 1].show = true;
        this.state.currentIndex++;
      } else {
        items[0].show = true;
        this.state.currentIndex = 0;
      }
    }
    // Go Prev, show prev item
    if (!goNext) {
      if (items[this.state.currentIndex - 1]) {
        items[this.state.currentIndex - 1].show = true;
        this.state.currentIndex--;
      } else {
        items[items.length - 1].show = true;
        this.state.currentIndex = items.length - 1;
      }
    }
    this.setState({ items });
  };

  render() {
    return (
      <Paper elevation={1} className="slide-container ">
        <Grid container direction="row" justify="center" alignItems="center">
          <IconButton
            onClick={() => this.handleChange(false)}
            className="arrow"
          >
            <ChevronLeftIcon />
          </IconButton>
          {this.state.items.map(item => (
            <Fade
              in={item.show}
              className={item.show ? "slide-item--show" : "slide-item--hide"}
              key={item._id}
            >
              {item.show ? item.content : <h1>No Weather</h1>}
            </Fade>
            // Dots
          ))}
          <IconButton onClick={() => this.handleChange(true)} className="arrow">
            <ChevronRightIcon />
          </IconButton>
        </Grid>
      </Paper>
    );
  }
}

export default CustomSlider;
