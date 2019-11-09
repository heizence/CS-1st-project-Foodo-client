import React, { Component } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import {
  Button,
  Container,
  Row,
  Col
} from "reactstrap";
import "../App.css";
import "./AddFood.css";

const axios = require("axios");

class AddFood extends Component {
  constructor() {
    super();
    this.items = [];
    this.state = {
      FoodToAdd: {
        name: "",
        exp: "",
        rest: "",
        msg: "",
        userMemo: "",
        frozen: "",
        quantity: "",
        unit: ""
      },
      suggestions: [],
      text: ""
    };

    this.FoodOnChange = this.FoodOnChange.bind(this);
    this.onTextChanged = this.onTextChanged.bind(this);
    this.renderSuggestions = this.renderSuggestions.bind(this);
    this.suggestionSelected = this.suggestionSelected.bind(this);
    this.clear = this.clear.bind(this);
    this.AddFood = this.AddFood.bind(this);
  }

  FoodOnChange(e) {
    let name = e.target.name;
    let pre = this.state.FoodToAdd;
    pre[name] = e.target.value;
    this.setState({
      FoodToAdd: pre
    });
  }

  onTextChanged(e) {
    const value = e.target.value;
    let suggestions = [];

    const items = [];
    this.items.forEach(obj => {
      items.push(obj.ing_name);
    });

    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = items.sort().filter(v => regex.test(v));
    }
    this.setState(() => ({ suggestions, text: value }));
    //console.log(this.state.suggestions);
  }

  suggestionSelected(value) {
    this.setState(() => ({
      text: value,
      suggestions: []
    }));
  }

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul id="searchList">
        {suggestions.map((item, index) => (
          <li
            className="searchedItem"
            key={index}
            onClick={() => this.suggestionSelected(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  AddFood() {
    axios
      .post("/ingredients/addItem", {
        frozen: this.state.FoodToAdd.frozen,
        ing_name: this.state.FoodToAdd.mainIng,
        exp: this.state.FoodToAdd.exp,
        quantity: this.state.FoodToAdd.quantity,
        unit: this.state.FoodToAdd.unit,
        memo: this.state.FoodToAdd.userMemo
      })
      .then(res => {
        console.log("ai", res);
      });
  }

  clear() {
    let info = document.getElementsByTagName("Input");
    let userMemo = document.getElementById("exampleText");

    for (let i = 0; i < info.length; i++) {
      console.log(info[i].value);
      info[i].value = "";
      if (info[i].checked) {
        info[i].checked = "";
      }
    }
    userMemo.value = "";
  }

  componentDidMount() {
    axios
      .get("/ingredients/all")
      .then(res => {this.items = res.data})
  }


  render() {
    return (
      <Container fluid>
        <div id="addStock" className="addfood-main">
          <Row>
            <Col className="addfood-col">
              <Form>
                <FormGroup>
                  <Label for="exampleUrl" className="addStockLabel">
                    Food
                  </Label>
                  <Input
                    type="text"
                    name="mainIng"
                    value={this.text}
                    id="exampleFood"
                    placeholder="추가할 식품을 입력하세요"
                    autoComplete="off"
                    onChange={e => {
                      this.FoodOnChange(e);
                      this.onTextChanged(e);
                    }}
                  />
                  {this.renderSuggestions()}
                </FormGroup>
                <div style={{ marginBottom: "10px" }}>
                  <p>
                    <b>식품 보관 유형을 선택하세요</b>
                  </p>
                  <label>
                    <input
                      type="radio"
                      style={{ marginLeft: "10px", marginRight: "10px" }}
                      name="frozen"
                      value={false}
                      onChange={this.FoodOnChange}
                    />{" "}
                    냉장
                  </label>
                  <label>
                    <input
                      type="radio"
                      style={{ marginLeft: "10px", marginRight: "10px" }}
                      name="frozen"
                      value={true}
                      onChange={this.FoodOnChange}
                    />{" "}
                    냉동
                  </label>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <p>
                    <b>식품 수량 단위를 선택하세요</b>
                  </p>
                  <label>
                    <input
                      type="radio"
                      style={{ marginLeft: "10px", marginRight: "10px" }}
                      name="unit"
                      value="개"
                      onChange={this.FoodOnChange}
                    />{" "}
                    개
                  </label>
                  <label>
                    <input
                      type="radio"
                      style={{ marginLeft: "10px", marginRight: "10px" }}
                      name="unit"
                      value="g"
                      onChange={this.FoodOnChange}
                    />{" "}
                    g
                  </label>
                </div>
                <FormGroup>
                  <Label for="exampleNumber" className="addStockLabel">
                    Quantity
                  </Label>
                  <Input
                    type="number"
                    name="quantity"
                    id="exampleNumber"
                    placeholder="수량을 입력하세요"
                    onChange={this.FoodOnChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleDate" className="addStockLabel">
                    Date
                  </Label>
                  <Input
                    type="date"
                    name="exp"
                    id="exampleDate"
                    placeholder="date placeholder"
                    onChange={this.FoodOnChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText" className="addStockLabel">
                    User Memo
                  </Label>
                  <Input
                    type="textarea"
                    name="userMemo"
                    id="exampleText"
                    placeholder="추가로 메모할 사항을 입력하세요"
                    onChange={this.FoodOnChange}
                  />
                </FormGroup>
              </Form>
              <Button
                className="font-weight-bold "
                style={{ backgroundColor: "#63007a" }}
                size="sm"
                onClick={() => {
                  this.AddFood();
                  this.clear();
                }}
              >
                ADD
              </Button>
              {"  "}
              <Button
                className="font-weight-bold "
                color="secondary"
                size="sm"
                onClick={this.clear}
              >
                내용 초기화
              </Button>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

export default AddFood;