import {
  //BrowserRouter as Router,
  Redirect
} from "react-router-dom";
import React, { Component } from "react";
import "./App.css";
import Main from "./components/Main";
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  Navbar,
  NavbarBrand
} from "reactstrap";
import MainNav from "./components/MainNav";
import UserInfo from "./components/userinfo";
import CatList from "./components/categorylist";
import LoggedIn from "./pages/loggedin";

const axios = require("axios");

class App extends Component {
  constructor() {
    super();

    this.state = {
      FoodList: null,
      user: {
        email: "111@test.com",
        userName: "이지망",
        createdAt: "2019-11-03T00:00:00.000Z"
      },

      suggestions: [],
      text: "",
      logstatus: true,
      enteredIdtext: "111@test.com",
      enteredPwtext: "12341234",
      loggedInfo: { id: "111@test.com", pw: "12341234" },
      cat: false,
      currvideo:  null,
      pickedind: Math.floor(Math.random() * 7)
    };

    this.handleVid = this.handleVid.bind(this);
    this.handlesignup = this.handlesignup.bind(this);
    this.clickedcat = this.clickedcat.bind(this);
    this.fetchlogin = this.fetchlogin.bind(this);
    this.fetchmenus = this.fetchmenus.bind(this);
    this.logOut = this.logOut.bind(this);
    this.fetchSignUp = this.fetchSignUp.bind(this); 
    this.fetchIng = this.fetchIng.bind(this);
    this.enteredId = this.enteredId.bind(this);
    this.enteredPw = this.enteredPw.bind(this);
    this.redirectpage = this.redirectpage.bind(this);
    this.gotempty = this.gotempty.bind(this);
    this.setmenu = this.setmenu.bind(this);
    this.setnullmenu = this.setnullmenu.bind(this);
    this.mixmenu = this.mixmenu.bind(this);
  }
  mixmenu(e) {
    console.log("mixmenu", e);
//    window.sessionStorage.removeItem("menuindex")
const ran = Math.floor(Math.random() * e.length);
window.sessionStorage.setItem("menuindex",ran)

this.setState({
  pickedind: ran
});
  }
  setnullmenu() {
    console.log("setnullnum");
    this.setState({
      menu: null
    });
  }
  setmenu(e) {
    console.log("hi");
    this.setState({
      menu: e
    });
  }
  gotempty() {
    console.log("이벤트들어와ㅣㅆ다");
    this.setState({
      menu: null
    });
  }
  enteredId(e) {
    //console.log(this.state.enteredIdtext);
    let search = document.getElementsByClassName("form-control")[0].value;
    this.setState({
      enteredIdtext: search
    });
  }

  enteredPw(e) {
    //console.log(this.state.enteredPwtext);
    let search1 = document.getElementsByClassName("form-control-pw")[0].value;
    this.setState({
      enteredPwtext: search1
    });
  }

  logOut() {
    this.setState({
      logstatus: false,
      user: { email: "", userName: "", createdAt: "" }
    });
    window.sessionStorage.removeItem("logstatus");
    window.sessionStorage.removeItem("logid");
    window.sessionStorage.removeItem("logpw");
    window.sessionStorage.removeItem("cat");
  }

  fetchlogin() {
    axios
      .post("/users/signin", {
        email: this.state.enteredIdtext,
        password: this.state.enteredPwtext
      })
      .then(res => {
        console.log("login", res);

        document.cookie = `user = ${res.data.token}`;
        return res.data.token;
      })
      .then(data => {
        if (data) {
          console.log("login", data);
          window.sessionStorage.setItem("logstatus", true);
          window.sessionStorage.setItem("logid", this.state.enteredIdtext);
          window.sessionStorage.setItem("logpw", this.state.enteredPwtext);
          let newLoggedInfo = { ...this.state.loggedInfo };
          newLoggedInfo.id = this.state.enteredIdtext;
          newLoggedInfo.pw = this.state.enteredPwtext;

          this.setState({
            logstatus: true,
            loggedInfo: newLoggedInfo
          });
        }
      })
      .then(() => {
        console.log("saved", window.sessionStorage.getItem("logstatus"));
        axios.get("/ingredients", { withCredentials: true }).then(res => {
          console.log("dd", res.data);
          this.setState({
            FoodList: res.data
          });
        });

        axios
          .get("/menus", { withCredentials: true })
          .then(res => {
            console.log("usermenus", res.data);
            let result = this.pickmenu(res.data); //
            console.log("loginmenu", result);
            window.sessionStorage.setItem("menuindex",result)
            this.setState({
              pickedind: result,
              menu: res.data[result]
            });
          })
          .then(() => {
            if (!this.state.menu) {
              this.redirectpage();
            } else {
              console.log("dfasdfasdf", this.state.menu);
              let HTML = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCbnNgRBCcnN4p_U3e9RUV2oWSPkfVHG0Y&type=video&q=${this.state.menu.menu_name}&part=snippet&maxResults=5`;
              const getVid = function(HTML, callback) {
                fetch(HTML)
                  .then(res => res.json())
                  .then(res => callback(res));
              };
              getVid(HTML, data => {
                this.setState({
                  videos: data.items,
                  currvideo: data.items[0]
                });
              });
            }
          });
        console.log("first enteredid", this.state.enteredIdtext);
        axios.get(`/users`, { withCredentials: true }).then(res => {
          console.log("users", res.data);

          let users = res.data.findIndex(user => {
            return user.email === this.state.loggedInfo.id;
          });
          console.log("ㅇㅇㅇ", users);

          this.setState({
            user: res.data[users]
          });
        });
      });
  }

  fetchIng() {
    axios.get("/ingredients", { withCredentials: true }).then(res =>
      this.setState({
        FoodList: res
      })
    );
  }

  fetchmenus() {
    axios
      .get("/menus", { withCredentials: true })
      .then(res => console.log(res));
  }

  fetchSignUp() {
    console.log("d일단");
    axios
      .post("/users/signup", {
        email: this.state.enteredIdtext,
        password: this.state.enteredPwtext
      })
      .then(data => {
        console.log("가입", data);
        if (data.statusText === "Created") {
          alert("회원가입이 완료되었습니다!");
        } else {
          alert("회원가입에 실패했습니다");
        }
      });
  }

  clickedcat(e) {
    console.log("dd4654654", e);
    this.setState({
      cat: e
    });
  }

  handleVid(e) {
    //console.log(e.target);
    this.setState({
      currvideo: e
    });
  }

  handlesignup(e) {
    //console.log(e);
  }

  pickmenu(menus) {
    return Math.floor(Math.random() * menus.length);
  }

  redirectpage() {
    return <Redirect to="/StockList" />;
  }

  componentDidMount() {
    const logstatus = window.sessionStorage.getItem("logstatus");
    const logid = window.sessionStorage.getItem("logid");
    const logpw = window.sessionStorage.getItem("logpw");
    console.log(this.state.loggedInfo.id, this.state.loggedInfo.pw);
    if (logstatus) {
      axios
        .post("/users/signin", {
          email: logid,
          password: logpw
        })
        .then(res => {
          document.cookie = `user = ${res.data.token}`;
          return res.data.token;
        })
        .then(data => {
          if (data) {
            window.sessionStorage.setItem("logstatus", true);
            let newLoggedInfo = { ...this.state.loggedInfo };
            newLoggedInfo.id = window.sessionStorage.getItem("logid");
            newLoggedInfo.pw = window.sessionStorage.getItem("logpw");
            console.log("lodsfsdfsdgin", newLoggedInfo);

            this.setState({
              logstatus: true,
              loggedInfo: newLoggedInfo,
              enteredId: newLoggedInfo.email,
              enteredPw: newLoggedInfo.pw
            });
          }

          console.log("next enteredid", logid);

          axios
            .get(`/users`, {
              withCredentials: true
            })
            .then(res => {
              console.log("users", res.data);

              let users = res.data.findIndex(user => {
                return user.email === logid;
              });
              console.log("ㅇㅇㅇ", res.data[users]);

              this.setState({
                
                user: res.data[users]
              });
            
            });
        });
    } else {
      this.logOut();
    }
  }

  AddFood() {}

  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col sm="12">
              <MainNav />
            </Col>
          </Row>
          <Row>
            <Col>
              <Row className="row align-items-center">
                <Col>
                  <UserInfo user={this.state.user} logOut={this.logOut} logstatus ={this.state.logstatus}/>
                </Col>
              </Row>
              <Row className="row justify-content-between">
                <Col>
                  <CatList
                    clickedcat={this.clickedcat}
                    FoodData={this.state.FoodList}
                  />
                </Col>
              </Row>
            </Col>
            <Col sm="10" className="contents-col">
              {" "}
              {/*Contents*/}
              <div className="contens-content rounded">
                <Navbar className="navbar navbar-custom rounded-top  recmenu">
                  <NavbarBrand
                    className="text-white font-weight-bold"
                    href="/main"
                  ></NavbarBrand>
                  <Nav>
                    <NavItem className="text-white font-weight-bold"></NavItem>
                  </Nav>
                </Navbar>
                {this.state.logstatus ? (
                  <LoggedIn
                    mixmenu={this.mixmenu}
                    setmenu={this.setmenu}
                    setnullmenu={this.setnullmenu}
                    enteredId={this.enteredId}
                    gotempty={this.gotempty}
                    data={this.state}
                    fetchlogin={this.fetchlogin}
                    fetchSignUp={this.fetchSignUp}
                    handleVid={this.handleVid}
                    handlesignup={this.handlesignup}
                    popquater={this.popquater}
                    searchItems={this.items}
                    FoodOnChange={this.FoodOnChange}
                    onTextChanged={this.onTextChanged}
                    renderSuggestions={this.renderSuggestions}
                  />
                ) : (
                  <Main
                    fetchlogin={this.fetchlogin}
                    fetchSignUp={this.fetchSignUp}
                    enteredId={this.enteredId}
                    enteredPw={this.enteredPw}
                  />
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;