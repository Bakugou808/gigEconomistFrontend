 import React, { Component } from 'react'
 import Card from 'react-bootstrap/Card'
 import { connect } from "react-redux";
 import { Bar } from 'react-chartjs-2';


 
 class TaxesForService extends Component {
    
    generateRandomHexCode() {
        let hexCode = "#" 
    
        while ( hexCode.length < 7 ) {
          hexCode += (Math.round(Math.random() * 15)).toString(16) 
        }
    
        return hexCode 
    }

    convertData = () => {
        const {results} = this.props

        let datasets = []
        let dataset = {label: '', backgroundColor: '', data: []}
        let month = new Date()
        month = month.toLocaleString('default', { month: 'long'})

        let totalEarned = results.earned.sum
        let ssTax = (.124 * totalEarned)
        let mediTax = +((.029 * totalEarned).toFixed(2))
        let totalTax = ssTax + mediTax


        let data = {'Medicare': mediTax, 'Social Security': ssTax, 'Profits After Tax': (totalEarned - totalTax)}
        
        for(const stat in data){
            
            let count = data[stat]
            let yMax = count + (count/2)
            let color = this.generateRandomHexCode()
            dataset = {label: `${stat}: $${count}`, backgroundColor: color, data: [count, yMax]}
            datasets.push(dataset)
            console.log(datasets)
        }


        const chartData = {
            labels: [`Tax + Profit Analysis for ${month}`],
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
                        {this.props.results.earned && <Bar data={this.convertData()} options={options}/>}
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

export default connect(mapStateToProps)(TaxesForService)