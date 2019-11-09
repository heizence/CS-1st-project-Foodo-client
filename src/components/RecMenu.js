import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { faPlay, faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./RecMenu.css";
const axios = require("axios");
class RecMenu extends Component {
  constructor() {
    super();
    this.state = {
      menus: [{ menu_name: "삼겹살", menu_ing: "돼지고기" }],
      menu: { menu_name: "삼겹살", menu_ing: "돼지고기" },
      pic: "https://miro.medium.com/max/1080/0*DqHGYPBA-ANwsma2.gif"
    };
    this.getMenus = this.getMenus.bind(this);
  }

  getMenus() {
    axios
      .get("/menus", { withCredentials: true })
      .then(res => {
        console.log("usermenusfdfff안ㅇ", res.data[window.sessionStorage.getItem("menuindex")]);
        //
        this.setState({
          menus: res.data,
          menu: res.data[window.sessionStorage.getItem("menuindex")]
        });
      })
      .then(() => {
        let HTML = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCbnNgRBCcnN4p_U3e9RUV2oWSPkfVHG0Y&type=video&q=${this.state.menu.menu_name}&part=snippet&maxResults=5`;
        const getVid = function(HTML, callback) {
          fetch(HTML)
            .then(res => res.json())
            .then(res => callback(res));
        };
        getVid(HTML, data => {
          this.setState({
            pic: data.items[0].snippet.thumbnails.high.url
          });
        });
      });
         /* else {
          let HTML = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCbnNgRBCcnN4p_U3e9RUV2oWSPkfVHG0Y&type=video&q=none&part=snippet&maxResults=5`;
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
        }*/
      
  }

  componentDidMount() {
    this.getMenus();
  }

  render() {
    return (
      <div id="RecMenu" className="recmenu-main rounded">
        {this.state.menu !== null && this.state.menu !== undefined && (
          <Container>
            {console.log(this.state)}

            <Row className="align-items-center vid">
              <Col>
                <CardImg
                  top
                  src={this.state.pic}
                  alt="Card image cap"
                  style={{ width: "500px", borderRadius: "7px" }}
                />
                <CardBody>
                  <CardTitle className="font-weight-bold">
                    <br />
                    추천메뉴: {this.state.menu.menu_name}
                  </CardTitle>
                  <CardText className="font-weight-bold">
                    {" "}
                    재료: {this.state.menu.menu_ing}
                  </CardText>
                </CardBody>
              </Col>
            </Row>
            <Row className="row align-items-end">
              <Col className="col align-self-end">
                <div className="menu-footer">
                  <Row>
                    <Col>
                      <Nav className="font-weight-bold justify-content-center">
                        <NavItem
                          onClick={() => {
                            this.props.mixmenu(this.state.menus);
                          }}
                        >
                          <NavLink className="text-dark" href="/menus">
                            <FontAwesomeIcon icon={faRedo} />
                            {"  "}
                            다른메뉴
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink className="text-dark" href="/menus">
                            공유주방
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink className="text-dark" href="/lists">
                            영상보기 {"  "}
                            <FontAwesomeIcon icon={faPlay} />
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}

export default RecMenu;