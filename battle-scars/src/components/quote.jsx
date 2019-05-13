import React, { Component } from "react";
import axios from "axios";
import "./../styles/quote.scss";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AutorenewIcon from "@material-ui/icons/Autorenew";

// Quote source url:
// url: "https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?"
// source: "https://quotes.rest/qod.json?category="

class Quote extends Component {
  categories = [
    { _id: 0, name: "art", label: "Art" },
    { _id: 1, name: "love", label: "Love" },
    { _id: 2, name: "inspire", label: "Inspire" },
    { _id: 3, name: "life", label: "Life" },
    { _id: 4, name: "management", label: "Management" },
    { _id: 5, name: "sports", label: "Sports" },
    { _id: 6, name: "funny", label: "Funny" }
  ];

  state = {
    source: "https://quotes.rest/qod.json?category=",
    selectedCategory: this.categories[0], // Default "art"
    quote: {
      text: "",
      author: ""
    }
  };

  componentDidMount() {
    // Get the first quote
    this.getQuote(this.state.selectedCategory.name);
  }

  getQuote = category => {
    axios
      .get(this.state.source + category)
      .then(response => {
        this.setState({
          quote: {
            text: response.data.contents.quotes[0].quote,
            author: response.data.contents.quotes[0].author
          }
        });
        console.log(this.state, "here");
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="quote">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className="quote-text-container"
        >
          <IconButton
            aria-label="Refresh Quote"
            onClick={() => this.getQuote(this.state.selectedCategory.name)}
          >
            <AutorenewIcon />
          </IconButton>
          <i className="fa fa-quote-left quote-icon" />
          <Typography variant="h6" className="quote-text">
            {" "}
            {this.state.quote.text}{" "}
          </Typography>
          <i className="fa fa-quote-right quote-icon" />
        </Grid>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className="quote-author-container"
        >
          <Typography variant="subtitle2" className="quote-author">
            {" "}
            {this.state.quote.author}{" "}
          </Typography>
        </Grid>
      </div>
    );
  }
}

export default Quote;
