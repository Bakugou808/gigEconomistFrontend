import React, { Component } from 'react'
import { connect } from 'react-redux'
import Carousel from 'react-bootstrap/Carousel'
import Card from 'react-bootstrap/Card'




class TaxInfoCard extends Component {

    createServicesSlide = () => {
        const { data } = this.props
        const totals = data.totals 
        const services = data.services

        const div = []
        const subCardStyle = {

            'align-items': 'center',
            'justify-content': 'center',
            'display': 'flex',
            'width': 'flex',
            'height': '100%',
            'margin': '10px'
        }

        

        for (const service in services) {
            const element = services[service];
            let percentage = element.totalSum / totals.totalSum 
            percentage = parseFloat(percentage).toFixed(2)+'%'
            if (services.hasOwnProperty(service)) {
                
                div.push(
                    <Carousel.Item>
                        <Card border='info'
                            bg="warning"
                            text={'warning' === 'light' ? 'dark' : 'white'}
                            style={subCardStyle}>
                            <Card.Body>
                                <Card.Title>{service}</Card.Title>
                                <Card.Text>{service} makes up {percentage} of your total Profits this Year.</Card.Text>
                                <Card.Subtitle>Paid: ${element.totalSum} <br/> Proj: ${element.projSum} <br/> Total Appointments: {element.count} <br/> Completed Appointments: {element.completed} <br/></Card.Subtitle>
                                <Card.Text></Card.Text>
                            </Card.Body>
                        </Card>
                    </Carousel.Item>
                )
            }
        }
        return div

    }

    renderTaxInfo = () => {
        const { data } = this.props
        let totalEarned = data.totals.totalSum
        let ssTax = (.124 * totalEarned)
        let mediTax = ((.029 * totalEarned).toFixed(2))
        let totalTax = ssTax + mediTax
    }
    
    render() {
        const { data } = this.props
        // let totalEarned = data.totals.totalSum
        // let ssTax = (.124 * totalEarned)
        // let mediTax = +((.029 * totalEarned).toFixed(2))
        // let totalTax = ssTax + mediTax

        const subCardStyle = {

            'align-items': 'center',
            'justify-content': 'center',
            'display': 'flex',
            'width': 'flex',
            'height': '100%',
            'margin': '10px'
        }

        const iconStyle = {
            'display': 'hidden'
        }
        const year = Object.keys(data)
        // debugger
        return (
            <div>
              
                <Carousel prevIcon=' ' nextIcon='' pause='hover'>
                    <Carousel.Item>
                        <Card border='info'
                            bg="warning"
                            text={'warning' === 'light' ? 'dark' : 'white'}
                            style={subCardStyle}>
                            {data.totals && <Card.Body>
                                <Card.Title>Overview</Card.Title>
                                
                                <Card.Subtitle >Current Earnings: ${data.totals.totalSum} <br /> Projected Earnings: ${data.totals.projSum} <br /> Number Of Services: {data.totals.totalServices} <br /> </Card.Subtitle> <br/>
                                
                            </Card.Body>}
                        </Card>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Card border='info'
                            bg="warning"
                            text={'warning' === 'light' ? 'dark' : 'white'}
                            style={subCardStyle}>
                            {data.totals && <Card.Body>                                
                                <Card.Subtitle> <Card.Title>Tax Breakdown:</Card.Title> Medicare Tax: ${((.029 * (data.totals.totalSum)).toFixed(2))} <br/> Social Security Tax: ${(.124 * (data.totals.totalSum)).toFixed(2)} <br/> Total Taxes: ${((.124 * (data.totals.totalSum)) + ((.029 * (data.totals.totalSum)))).toFixed(2)}</Card.Subtitle>
                                <br/>
                                <Card.Text>(Medicare Tax: .029 x Total Earnings. Social Security Tax: .124 x Total Earnings. Total Taxes: Medicare Tax + Social Security Tax)</Card.Text>
                            </Card.Body>}
                        </Card>
                    </Carousel.Item>
                {data.totals && this.createServicesSlide()}
                </Carousel>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        data: store.stats.totalAnnualStats,
    }
}




export default connect(mapStateToProps)(TaxInfoCard)