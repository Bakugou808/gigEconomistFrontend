import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import { connect } from "react-redux";
import { Bar, Doughnut } from 'react-chartjs-2';


class TotalTaxes extends Component {
    generateRandomHexCode() {
        let hexCode = "#"

        while (hexCode.length < 7) {
            hexCode += (Math.round(Math.random() * 15)).toString(16)
        }

        return hexCode
    }

    // convertData = () => {
    //     const {totals} = this.props

    //     let datasets = []
    //     let dataset = {label: '', backgroundColor: '', data: []}
    //     let month = new Date()
    //     month = month.getFullYear()

    //     let totalEarned = totals.totals.totalSum
    //     let ssTax = (.124 * totalEarned)
    //     let mediTax = +((.029 * totalEarned).toFixed(2))
    //     let totalTax = ssTax + mediTax


    //     let data = {'Medicare': mediTax, 'Social Security': ssTax, 'Profits After Tax': (totalEarned - totalTax)}

    //     for(const stat in data){

    //         let count = data[stat]
    //         let yMax = count + (count/2)
    //         let color = this.generateRandomHexCode()
    //         dataset = {label: `${stat}: $${count}`, backgroundColor: color, data: [count, yMax]}
    //         datasets.push(dataset)
    //         console.log(datasets)
    //     }


    //     const chartData = {
    //         labels: [`Tax + Profit Analysis for ${month}`],
    //         datasets: [...datasets]
    //     }
    //     return chartData

    // }


    convertData = () => {
        const { totals } = this.props

        let datasets = [{ data: [], backgroundColor: [] }]
        let labels = []
        let dataset = { label: '', backgroundColor: [], data: [] }
        let month = new Date()
        month = month.getFullYear()

        let totalEarned = totals.totals.totalSum
        let ssTax = (.124 * totalEarned)
        let mediTax = +((.029 * totalEarned).toFixed(2))
        let totalTax = ssTax + mediTax


        let data = { 'Medicare': mediTax, 'SSec': ssTax, 'Profits': (totalEarned - totalTax) }

        
        // let data = { 'Projected': (results.projected.sum - results.earned.sum), 'Earned': results.earned.sum }

        for (const stat in data) {
            
            let count = data[stat].toFixed(2)
            let yMax = count + (count / 2)
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
                        beginAtZero: true
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
                        {/* {this.props.totals.totals && <Bar data={this.convertData()} options={options}/>}
                         */}
                        {this.props.totals.totals && <Doughnut data={this.convertData()} />}

                    </Card.Body>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        totals: store.stats.totalAnnualStats,
    }
}




export default connect(mapStateToProps)(TotalTaxes)
