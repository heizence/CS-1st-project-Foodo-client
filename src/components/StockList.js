import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, ListGroup, ListGroupItem, Col, Row } from "reactstrap";
import "./StockList.css";
import {
  faAppleAlt,
  faCartPlus
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RestStock from "./RestStock";
import EachStock from "./EachStock";

const axios = require("axios");

class StockList extends Component {
  constructor() {
    super();
    this.state = {
      FoodList: [
        {
          mainIng: "고구마",
          userIng: "",
          put: "2019-10-20",
          rest: 1,
          msg: "hurry up",
          userMemo: "",
          quantity: 1,
          frozen: true,
          unit: "개"
        }
      ]
    };
    this.getIng = this.getIng.bind(this);
    this.popones = this.popones.bind(this);
    this.removef = this.removef.bind(this);
  }
  removef(e) {
    const { FoodList } = this.state;
    this.setState({
      FoodList: FoodList.filter(
        food => food.put !== e.put || food.name !== e.name
      )
    });
    //post 로 지우는 메세지 날리기
  }
  getIng() {
    axios.get("/ingredients", { withCredentials: true }).then(res => {
      console.log("dd", res.data);
      if (res.data.length === 0) {
        console.log("itsempty");
        this.props.gotempty();
      } else {
        this.setState({
          FoodList: res.data
        });
      }
    });
  }

  popones(e) {
    const index = this.state.FoodList.findIndex(
      food => food.put === e.put && food.name === e.name
    );
    const selected = this.state.FoodList[index];
    const newFoodList = [...this.state.FoodList];
    if (newFoodList[index].unit === "g") {
      console.log("hi");
      if (newFoodList[index].quantity > 1000) {
        newFoodList[index] = {
          ...selected,
          quantity: newFoodList[index].quantity - 100
        };

        this.setState({
          FoodList: newFoodList
        });
      } else if (
        newFoodList[index].quantity > 100 &&
        newFoodList[index].quantity <= 1000
      ) {
        newFoodList[index] = {
          ...selected,
          quantity: newFoodList[index].quantity - 50
        };

        this.setState({
          FoodList: newFoodList
        });
      } else if (
        newFoodList[index].quantity > 0 &&
        newFoodList[index].quantity <= 100
      ) {
        if (newFoodList[index].quantity <= 10) {
          this.removef(e);
          this.props.setnullmenu();
          axios
            .post("/ingredients/delete", {
              ing_name: newFoodList[index].name, //name으로 보내기
              put: newFoodList[index].put,
              msg: newFoodList[index].msg
            })
            .then(res => console.log("delete", res));
        } else {
          newFoodList[index] = {
            ...selected,
            quantity: newFoodList[index].quantity - 10
          };

          this.setState({
            FoodList: newFoodList
          });
          axios
            .post("ingredients/quantity", {
              ing_name: newFoodList[index].name,
              put: newFoodList[index].put,
              quantity: newFoodList[index].quantity
            })
            .then(res => console.log("minus", res));
            }
      }
    } else {
      if (newFoodList[index].quantity === 1) {
        this.removef(e);
        console.log("deleteetetetet", newFoodList[index].name);
        axios
          .post("/ingredients/delete", {
            ing_name: newFoodList[index].name, //name으로 보내기
            put: newFoodList[index].put,
            msg: newFoodList[index].msg
          })
          .then(res => console.log("delete", res));
      } else {
        newFoodList[index] = {
          ...selected,
          quantity: newFoodList[index].quantity - 1
        };

        this.setState({
          FoodList: newFoodList
        });
        axios
        .post("ingredients/quantity", {
          ing_name: newFoodList[index].name,
          put: newFoodList[index].put,
          quantity: newFoodList[index].quantity
        })
        .then(res => console.log("minus", res));
      }

      //Post로 수량조절 날리기
      
    }
  }

  componentDidMount() {
    this.getIng();
  }
  render() {
    return (
      <div id="Stock" className="stock-main rounded">
        {console.log("재료다11", this.state.FoodList)}
        <div id="StockList">
          <ListGroup flush className="stock-listgroup">
            {this.state.FoodList.map((data, index) => {
              return this.props.cat === data.frozen ? (
                <ListGroupItem
                  style={{ backgroundColor: "#f9f9f9" }}
                  className="font-weight-bold stock-list"
                  data={data}
                  key={index}
                  index={index}
                >
                  <Row>
                    <Col
                    >
                      <RestStock data={data} />
                    </Col>
                    <Col>
                      {data.quantity}
                      {"  "}
                      {data.unit}
                    </Col>
                    <Col>
                      <small>{data.put.slice(5, 10)} </small>
                    </Col>
                    <Col className="">{data.name}</Col>
                    <Col>{data.rest} 일</Col>
                    <Col>
                      {" "}
                      <EachStock data={data} />{" "}
                    </Col>

                    <Col>
                      {" "}
                      <Button
                        color="warning"
                        size="sm"
                        onClick={() => {
                          this.popones(data);
                        }}
                      >
                        <FontAwesomeIcon icon={faAppleAlt} />
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ) : (
                ""
              );
            })}
          </ListGroup>
        </div>
        <Link to="/AddFood">
          <Button
            size="lg"
            style={{ marginBottom: "10px", backgroundColor: "#63007a" }}
          >
            <FontAwesomeIcon icon={faCartPlus} />
          </Button>{" "}
        </Link>
      </div>
    );
  }
}

export default StockList;