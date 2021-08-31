import React from "react";

export class RestProvider extends React.Component {
  componentDidMount() {
    const { url } = this.props;
    if (!url) {
      throw new Error("Url isn't defined in RestProvider.");
    }
  }

  render() {
    return this.props.children;
  }
}
