 import React, { Component } from 'react'
 import Card from 'react-bootstrap/Card'
 import { connect } from "react-redux";
 import { Bar } from 'react-chartjs-2';

 
class PopularService extends Component {
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
            
            let count = data[service].length
            let yMax = count + (count/2)
            let color = this.generateRandomHexCode()
            dataset = {label: `${service}: ${count}`, backgroundColor: color, data: [count, yMax]}
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
                               labelString: '# of Appts',
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
        data: store.stats.mostPopService
    }
}



export default connect(mapStateToProps)(PopularService)