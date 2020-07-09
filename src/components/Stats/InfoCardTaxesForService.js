import React from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'


function InfoCardTaxesForService(props) {

    const convertData = () => {
        const {results} = props 
        let data = []
        let totalEarned = results.earned.sum
        let ssTax = (.124 * totalEarned)
        let mediTax = +((.029 * totalEarned).toFixed(2))
        let totalTax = ssTax + mediTax
        totalTax = Math.round(totalTax * 100)/100

        data = [{y: mediTax, x: `Medicare Tax`}, {y: ssTax, x: `Social Security Tax`}, {y: (totalEarned - totalTax), x: `Profits After Tax`}]
       
        return {ssTax: ssTax.toFixed(2), mediTax: mediTax.toFixed(2), totalTax: totalTax.toFixed(2), profits: (totalEarned - totalTax).toFixed(2), totalEarned: totalEarned.toFixed(2)}
    }

    const cardStyle = {
        "margin": '10px',
    }

    return ( 
        <div>
            {props.results.earned && <Card bg={'warning'}
                // key={service.id}
                border='info'
                style={cardStyle}
                text={'info'.toLowerCase() === 'light' ? 'dark' : 'white'}>
                
                <Card.Text style={cardStyle}>So far this month: You've made ${convertData().totalEarned} for {props.selectedService.title}. ${convertData().mediTax} goes to Medicare Tax. ${convertData().ssTax} goes to Social Security Tax. <br/> For a total of ${convertData().totalTax} going to Taxes. This leaves you ${convertData().profits} to save or spend. </Card.Text>
                        
            </Card>}
        </div>
    )
}

const mapStateToProps = (store) => {
    return {
        results: store.stats.serviceStats.earnedVsProjected,
        selectedService: store.services.selectedService
    }
}

export default connect(mapStateToProps)(InfoCardTaxesForService)