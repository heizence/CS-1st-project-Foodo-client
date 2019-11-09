import React, { Component } from "react";
import { Bar } from 'react-chartjs-2';
const axios = require("axios");

class Chart extends Component{
  constructor(props){
    super(props)
    this.state ={
      data : []
    }
  }  
  componentDidUpdate(){  
    axios
      .get("/ingredients", { withCredentials: true })
      .then(res => {
        this.setState({ data : res.data})
      });
  }
  
  render(){
    const datas = {
      labels: [],
      datasets: [
        {
          label: '수량',
          backgroundColor: [],
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 0,
          data: []
        }
      ]
    }
    for(let i = 0; i <this.state.data.length; i++){
      datas.labels.push(this.state.data[i].name)
      datas.datasets[0].data.push(this.state.data[i].quantity)
      if(this.state.data[i].rest > 3){
        datas.datasets[0].backgroundColor.push('rgb(0,200,83,0.9)')
      }
      else if(this.state.data[i].rest > 0){
        datas.datasets[0].backgroundColor.push('rgb(255,214,0,0.9)')
      }
      else {
        datas.datasets[0].backgroundColor.push('rgb(221,44,0,0.9)')
      }
    }
    
    return (
      <div style = {{ margin : "30px"}}>        
        <Bar
          data={datas}
          options={{
            title:{
              display:true,
              text:'Quantity of Stock List',
              fontSize:30
            },
            legend:{
              display:false,
              position:'bottom'
            },
            scales: { //X,Y축 옵션
              yAxes: [{
                  ticks: {
                      beginAtZero:true  //Y축의 값이 0부터 시작
                  }
              }]
            }
          }}
        />
      </div>
    )
  }
}

export default Chart;