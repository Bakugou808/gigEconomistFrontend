 import React, { Component } from 'react'
 import { connect } from 'react-redux'
 import { Bar } from 'react-chartjs-2';
 import Card from 'react-bootstrap/Card'

 
 class LucrativeService extends Component {
    
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
            let sum = serv.sum
            let proj = serv.projSum
            let color = this.generateRandomHexCode()
            let label = `${service}: $${sum}`
            dataset = {label: label, backgroundColor: color, data: [sum, proj]}
            
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
                               labelString: 'Dollars',
                               fontSize: 20 
                            }
                      }],
                      y: {
                          stacked: true
                      },
                      x: {
                          stacked: true
                      }            
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
        data: store.stats.mostLucService
    }
}


export default connect(mapStateToProps)(LucrativeService)