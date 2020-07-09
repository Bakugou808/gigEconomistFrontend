import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Bar } from 'react-chartjs-2';
import Card from 'react-bootstrap/Card'

class TimeIntensive extends Component {
    
    generateRandomHexCode() {
        let hexCode = "#" 
    
        while ( hexCode.length < 7 ) {
          hexCode += (Math.round(Math.random() * 15)).toString(16) 
        }
    
        return hexCode 
    }

    convertData = () => {
        const {data} = this.props

        let datasets = []
        let dataset = {label: '', backgroundColor: '', data: []}
        let month = new Date()
        month = month.toLocaleString('default', { month: 'long'})
        
        for(const service in data){
            let serv = data[service]

            let time = (serv.totalTimeMin / 60)/60
            let yMax = time + (time/2)
            let color = this.generateRandomHexCode()
            
            dataset = {label: service, backgroundColor: color, data: [time, yMax]}
            datasets.push(dataset)
            console.log(datasets)
        }


        const chartData = {
            labels: [month],
            datasets: [...datasets]
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
                               labelString: '# of Hours',
                               fontSize: 20 
                            }
                      }]            
                  }  
          }

        return (
            <div> 
                <Card>
                    <Card.Body>
                        {this.props.data && <Bar data={this.convertData()} options={options}/>}
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        data: store.stats.mostTimeIntServ
    }
}




export default connect(mapStateToProps)(TimeIntensive)
