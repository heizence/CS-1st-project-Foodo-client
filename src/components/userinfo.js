import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList
} from "@fortawesome/free-solid-svg-icons";

const date = new Date()
const mon = date.getMonth()+1
const day = date.getDate()

const UserInfo = ({ user, logOut, logstatus }) => (
  logstatus ? 
  <div
    style={{
      width: "160px",
      height: "315px",
      backgroundColor: "#f9f9f9",
    }}
    className="rounded"
  >
    <Container fluid>
      <Row
        className="justify-content-center"
        style={{  height: "315px", alignItems: "center" }}
      >
        <Col className="align-self-center">
          <Row className="justify-content-center">
            <div>
              {console.log("useriffnif", user)}
              {user.userName} 님의 <br />
              Foo-do <br />
              {mon}월{day}일
            </div>
          </Row>

          <Row className="justify-content-center">
            <div>
              <Button onClick={logOut}
              style={{ marginTop: "10px" }} >로그아웃</Button>
            </div>
          </Row>

          {/*    <Row className="justify-content-center">
            <div>
              e-mail <br /> {user.email}
            </div>
          </Row> */}
        </Col>
      </Row>
    </Container>
  </div> : <Container fluid>
      <Row
        className="justify-content-center"
        style={{ height: "315px", alignItems: "center" ,backgroundColor: "#f9f9f9"}}
      >
        <Col className="align-self-center">
          <Row className="justify-content-center">
            <div>
              
            <FontAwesomeIcon icon={faClipboardList} size='2x' />
              
            </div>
          </Row>

          <Row className="justify-content-center">
            <div>
             
            </div>
          </Row>

          {/*    <Row className="justify-content-center">
            <div>
              e-mail <br /> {user.email}
            </div>
          </Row> */}
        </Col>
      </Row>
    </Container>

);

export default UserInfo;
//{ id: "user1", userName: "mueller", email: "flqjsl@ gmail.com" }
