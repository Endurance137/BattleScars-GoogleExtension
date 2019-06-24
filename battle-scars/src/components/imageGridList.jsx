import React, { Component } from "react";
import "./../styles/imageGridList.scss";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

class ImageGridList extends Component {
  state = {
    backgroundImage: this.props.backgroundImage,
    images: []
  };

  componentDidMount() {
    this.importImages(
      require.context(
        "./../assets/background-images/",
        true,
        /\.(png|jpe?g|svg)$/
      )
    );
  }

  importImages = r => {
    const images = [...this.state.images];
    r.keys().forEach(key => {
      const img = {
        name: r(key),
        raised: "true"
      };
      images.push(img);
    });
    this.setState({ images });
  };

  handleImageSelected = img => {
    this.setState({ backgroundImage: img });
    this.props.handleChange("backgroundImage", img);
  };

  render() {
    return (
      <div className="image-grid-container">
        <GridList cols={3}>
          {/* TODO: add loader */}
          {this.state.images.map((img, i) => (
            <GridListTile
              key={i}
              cols={1}
              rows={1}
              className={
                this.state.backgroundImage === img.name
                  ? "image-selected"
                  : "image-box"
              }
              onClick={() => this.handleImageSelected(img.name)}
            >
              <img
                className="image"
                src={`${window.location.href}${img.name}`}
                alt={img.name}
              />
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default ImageGridList;
