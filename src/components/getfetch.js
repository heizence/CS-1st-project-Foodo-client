const fetch = require("node-fetch");

export const fetchComp = ({ route, request, body }, callback) => {
  const server = `http://localhost:5000/${route}`;
  if (request === "POST") {
    //자동완성//
    fetch(server, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        callback(data);
      });
  } else {
    fetch(server)
      .then(res => res.json())
      .then(data => callback(data));
  }
};
