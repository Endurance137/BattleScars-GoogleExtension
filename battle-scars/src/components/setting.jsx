import React, { Component } from "react";
import "./../styles/setting.scss";

import CustomDialog from "./common/customDialog";
import CustomTabs from "./common/customTabs";
import ImageGridList from "./imageGridList";
import GeneralPreference from "./generalPreference";

class Setting extends Component {
  state = {
    tabs: [
      {
        _id: 0,
        label: "General",
        content: (
          <div>
            <h2>General</h2>
            <GeneralPreference />
          </div>
        )
      },
      {
        _id: 1,
        label: "Background Image",
        content: (
          <div>
            <h2>Background Images</h2>
            <ImageGridList />
          </div>
        )
      }
    ]
  };
  render() {
    return (
      <CustomDialog
        title="Setting"
        tabs={<CustomTabs tabs={this.state.tabs} />}
        isOpen={this.props.isOpen}
        onDialogClose={this.props.onDialogClose}
        onDialogSave={() => this.props.handleSettingSave()}
        fullScreen={false}
      />
    );
  }
}

export default Setting;
