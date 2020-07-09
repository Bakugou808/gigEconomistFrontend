import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Scatter, Chart } from 'react-chartjs-2';
import Card from 'react-bootstrap/Card'
import { findAllByDisplayValue } from '@testing-library/react';


class ApptThisWeek extends Component {

    convertData = ()=> {
        const {data} = this.props
        
        let days = Object.keys(data)
        let apptData = []
        for(const day in data){
            if (data[day].length) {
                console.log('day', day)
                let dayData = data[day][0]
                for(const appt in dayData){
                    let time = new Date(appt.time_of_appointment)
                    time = time.getHours()
                    debugger
                    // let time = 9
                    switch(day){
                        case 'Sunday':
                            apptData.push({x: 1, y: time})
                        case 'Monday':
                            apptData.push({x: 2, y: time})
                        case 'Tuesday':
                            apptData.push({x: 3, y: time})
                        case 'Wednesday':
                            apptData.push({x: 4, y: time})
                        case 'Thursday':
                            apptData.push({x: 5, y: time})
                        case 'Friday':
                            apptData.push({x: 6, y: time})
                        case 'Saturday':
                            apptData.push({x: 7, y: time})
    
                    }
                }
            }
            
        }
        console.log('apptdata', apptData)
    }


    scatterChart = ()=> {
        const {data} = this.props



        const labels = Object.keys(data)
        const chartData = [{
            x: -10,
            y: 0,
         }, {
            x: 0,
            y: 10
         }, {
            x: 10,
            y: 5
         }]

        const chart = new Chart({
        type: 'scatter',
        data: {
           labels: labels,
           datasets: [{
              label: 'Legend',
              data: chartData
           }]
        },
        options: {
           tooltips: {
              callbacks: {
                 label: function(tooltipItem, data) {
                    var label = data.labels[tooltipItem.index];
                    return label + ': (' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ')';
                 }
              }
           }
        }
     });
    }




    render() {
        
        return (
            <div>
                <Card>
                    <Card.Body>
                        {this.props.data.Wednesday && this.convertData()}
                        {/* {this.props.data[Sunday]<Scatter data={} options={}/>} */}
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        data: store.stats.apptThisWeek
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ApptThisWeek)