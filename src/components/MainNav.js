import React from "react";
import "./Nav.css";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import {
  faUtensils,
  faCarrot,
  faStore,
  faHamburger,
  faChartBar
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Example = props => {
  return (
    <div className="NavBar">
      <Navbar className="navbar navbar-custom rounded mainnav">
        <NavbarBrand className="text-white font-weight-bold" href="/main">
          <FontAwesomeIcon icon={faUtensils} />
        </NavbarBrand>
        <Nav>
          <NavItem>
            <NavLink className="text-white font-weight-bold" href="Chart">
              <FontAwesomeIcon icon={faChartBar} />
              chart
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="text-white font-weight-bold" href="StockList">
              <FontAwesomeIcon icon={faCarrot} />
              groceries
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="text-white font-weight-bold" href="/menus">
              <FontAwesomeIcon icon={faHamburger} /> menu
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="text-white font-weight-bold" href="/menus">
              <FontAwesomeIcon icon={faStore} /> sharing kitchen
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Example;
