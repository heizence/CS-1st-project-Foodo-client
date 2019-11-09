import React from "react";

function EachStock({ data }) {
  const result = data => {
    if (data.msg === "No Eat") {
      return <span style={{ color: "#63007a" }}>No Eat</span>;
    } else if (data.msg === "fresh!") {
      return <span style={{ color: "green" }}>Fresh</span>;
    } else {
      return <span style={{ color: "orange" }}>Hurry Eat</span>;
    }
  };
  return <span>{result(data)}</span>;
}

export default EachStock;
