import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { faIceCream, faWater } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CatList = ({ clickedcat }) => (
  <div
    style={{
      width: "160px",
      height: "315px",
      backgroundColor: "#f9f9f9",
      marginTop: "10px"
    }}
    className="rounded"
  >
    <Container>
      <Row style={{ height: "150px", alignItems: "center" }}>
        <Col>
          <Button
            size="lg"
            color="link"
            className="text-dark"
            style={{ marginBottom: "10px" }}
            onClick={() => {
              clickedcat(false);
            }}
          >
            <FontAwesomeIcon icon={faWater} size ="1.5x" />
          </Button>{" "}
        </Col>
      </Row>
      <hr />
      <Row style={{ height: "100px", alignItems: "center" }}>
        <Col>
          <Button
            size="lg"
            color="link"
            className="text-dark"
            style={{ marginBottom: "10px" }}
            onClick={() => {
              clickedcat(true);
            }}
          >
            <FontAwesomeIcon icon={faIceCream} size ="1.5x"/>
          </Button>{" "}
        </Col>
      </Row>
    </Container>
  </div>
);

export default CatList;
