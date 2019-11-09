import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardGroup
} from "reactstrap";
import VidPlayer from "./player";
const axios = require("axios");

class ListOfRecipe extends Component {
  constructor() {
    super();
    this.state = {
      video: null,
      videos: null
    };
  }

  componentDidMount() {
    axios
    .get("/menus", { withCredentials: true })
    .then(res => {
      console.log("usermenusdffdfd", res.data);
      console.log("pickedind", this.props);
      window.sessionStorage.getItem("menuindex")
      return res.data[window.sessionStorage.getItem("menuindex")];
    })
    .then(res => {
      if (this.props.pickedind !== null) {
        console.log("dfasdfasdfdsfsdfasdfasdf", res);
        let HTML = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCbnNgRBCcnN4p_U3e9RUV2oWSPkfVHG0Y&type=video&q=${res.menu_name}&part=snippet&maxResults=5`;
        const getVid = function(HTML, callback) {
          fetch(HTML)
            .then(res => res.json())
            .then(res => callback(res));
        };
        getVid(HTML, data => {
          this.setState({
            videos: data.items,
            video: data.items[0]
          });
        });
      } else {
        let HTML = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCbnNgRBCcnN4p_U3e9RUV2oWSPkfVHG0Y&type=video&q=계란찜&part=snippet&maxResults=5`;
        const getVid = function(HTML, callback) {
          fetch(HTML)
            .then(res => res.json())
            .then(res => callback(res));
        };
        getVid(HTML, data => {
          this.setState({
            videos: data.items,
            video: data.items[0]
          });
        });
      }
    });
  }
  render() {
    return (
      
      <Container fluid>
        <Row style={{ height: "450px", alignItems: "center" }}>
          {console.log("videocont",this.props)}
          {this.state.videos !== null && (

          <Col>
          {this.props.video ===null ? (<VidPlayer video={this.state.video} />):(
            <VidPlayer video={this.props.video} />
            )}
              
            
           
           
          </Col>
           )}
        </Row>
        <Row>
          <Col>
            {this.state.videos !== null && (
              <CardGroup>
                {this.state.videos.map(vid => (
                  <Card
                    key={vid.id.videoId}
                    onClick={() => this.props.handleVid(vid)}
                  >
                    <CardImg
                      top
                      width="100px"
                      src={vid.snippet.thumbnails.default.url}
                      alt="Card image cap"
                    />
                  </Card>
                ))}
              </CardGroup>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ListOfRecipe;