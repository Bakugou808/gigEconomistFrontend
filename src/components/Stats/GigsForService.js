import React, { Component } from 'react'
 import Card from 'react-bootstrap/Card'
 import { connect } from "react-redux";
 import { Bar } from 'react-chartjs-2';
 import {fetchServicesMonthsGigs} from '../../actions/statsActions'


 
 class GigsForService extends Component {


    componentDidMount(){
        const {selectedService, onGetMonthsGigs} = this.props
        selectedService.id && onGetMonthsGigs(selectedService.id)
    }
    
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
        
        for(const gig in data){
            
            let count = data[gig].length
            let yMax = count + (count/2)
            let color = this.generateRandomHexCode()
            dataset = {label: gig, backgroundColor: color, data: [count, yMax]}
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
        selectedService: store.services.selectedService,
        data: store.stats.serviceStats.gigsThisMonth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetMonthsGigs: (serviceId) => fetchServicesMonthsGigs(serviceId, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GigsForService)