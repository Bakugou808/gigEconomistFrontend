import React, { Component } from 'react'
 import Card from 'react-bootstrap/Card'
 import { connect } from "react-redux";
 import { Doughnut, Pie } from 'react-chartjs-2';


 class ServiceEarnedVsProjected extends Component {
    
    generateRandomHexCode() {
        let hexCode = "#" 
    
        while ( hexCode.length < 7 ) {
          hexCode += (Math.round(Math.random() * 15)).toString(16) 
        }
    
        return hexCode 
    }

    convertData = () => {
        const {results} = this.props

        let datasets = [{data: [], backgroundColor: []}]
        let labels = []
        let dataset = {label: '', backgroundColor: [], data: []}
        let month = new Date()
        month = month.toLocaleString('default', { month: 'long'})

       


        let data = {'Projected': (results.projected.sum - results.earned.sum), 'Earned': results.earned.sum}
        
        for(const stat in data){
            
            let count = data[stat]
            let yMax = count + (count/2)
            let color = this.generateRandomHexCode()
            
            labels.push(`${stat}: $${count}`)
            datasets[0].data.push(count)
            datasets[0].backgroundColor.push(color)
            console.log(datasets)
        }


        const chartData = {
            labels: [...labels],
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
                      }]            
                  }  
          }

        return (
            <div> 
                <Card>
                    <Card.Body>
                        {this.props.results.earned && <Doughnut data={this.convertData()} />}
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        results: store.stats.serviceStats.earnedVsProjected
    }
}

export default connect(mapStateToProps)(ServiceEarnedVsProjected)