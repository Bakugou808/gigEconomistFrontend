import React, { Component } from 'react'
import { connect } from "react-redux";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Line } from 'react-chartjs-2';


class CurrentVsProjectedIncome extends Component {

    convertData = () => {
        const {data} = this.props
        
        let curr = []
        for (const month in data[2020].monthly){curr.push(data[2020].monthly[month].curr)}

        let proj = []
        for (const month in data[2020].monthly){proj.push(data[2020].monthly[month].proj)}
        console.log('curr', curr, 'proj', proj)

        let current = curr[0]
        let projected = proj[0]
        const chartData = {
            labels: Object.keys(data[2020].monthly),
            datasets: [
            {
                label: `Current Earnings: $${current}`,
                fill: true, 
                lineTension: 0.5,
                backgroundColor: 'rgb(41, 230, 201)',
                borderWidth: 2,
                data: [...curr]  
            },
            // spanGaps: true,
            // datasets: [
            {
                label: `Projected Earnings: $${projected}`,
                fill: true, 
                lineTension: 0.5,
                backgroundColor: 'rgb(250, 156, 15)',
                borderWidth: 2,
                data: [...proj]
            }
            ]
        }
        return chartData
        
    }
    
    
    render() {
        const options = {
            scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero:true
                          },
                          scaleLabel: {
                               display: true,
                               labelString: 'Earnings',
                               fontSize: 20 
                            }
                      }]            
                  }  
          }
        return (
            
            <div>
                <Card>
                    <Card.Body>
                        {this.props.data[2020] && <Line data={this.convertData()} options={options}/>}
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        data: store.stats.currentVsProj,
        appts: store.stats.ApptThisWeek
    }
}



export default connect(mapStateToProps)(CurrentVsProjectedIncome)