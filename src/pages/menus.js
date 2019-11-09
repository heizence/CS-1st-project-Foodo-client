import React, { Component } from "react";
import { Container } from "reactstrap";
import RecMenu from "../components/RecMenu";

const axios = require("axios");

class Menus extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    var pore;

    axios
      .get("/menus", { withCredentials: true })
      .then(res => {
        console.log("usermenusdffdfd", res.data[this.props.pickedind]);
        pore = res.data[this.props.pickedind];
      })
      .then(() => pore);
    console.log("porepore", pore);
  }
  render() {
    return (
      <div>
        {console.log("porepore", this.props)}{" "}
        {this.props.pickedind !== null && this.props.pickedind !== undefined && (
          <Container>
            <div className="button">
              {console.log(
                "mendfdsfusdsfsdfdssdsdsdsfsd",
                this.props.pickedind
              )}

              <RecMenu
                mixmenu={this.props.mixmenu}
                menu={this.props.pickedind}
                pic={this.props.pic}
                setmenu={this.props.setmenu}
                pickedind={this.props.pickedind}
              />
            </div>
          </Container>
        )}
      </div>
    );
  }
}

export default Menus;
