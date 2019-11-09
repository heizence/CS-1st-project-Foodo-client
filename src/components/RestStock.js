import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./StockList.css";
import {
  faBatteryQuarter,
  faBatteryHalf,
  faBatteryThreeQuarters,
  faBatteryFull
} from "@fortawesome/free-solid-svg-icons";
import React from "react";

function RestStock({ data }) {
  console.log("reststock", data);
  const result = data => {
    let percentage = (data.quantity / data.entryQ) * 100;
    console.log("%", percentage);
    if (percentage <= 100 && percentage > 75) {
      return <FontAwesomeIcon icon={faBatteryFull} />;
    } else if (percentage <= 75 && percentage > 50) {
      return <FontAwesomeIcon icon={faBatteryThreeQuarters} />;
    } else if (percentage <= 50 && percentage > 25) {
      return <FontAwesomeIcon icon={faBatteryHalf} />;
    } else if (percentage <= 25 && percentage > 0) {
      return <FontAwesomeIcon icon={faBatteryQuarter} />;
    } else {
      return "";
    }
  };
  return <span>{result(data)}</span>;
}

export default RestStock;
