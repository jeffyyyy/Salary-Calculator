import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DisplayRow from './DisplayRow'

class ResultDisplay extends Component {

  render () {
    if (!this.props.payslipData || this.props.payslipData.length === 0) return null

    return (
      <div className='mb-5'>
        <div className='alert alert-success text-center'>
          Payslip detail for <strong>{this.props.fullname}</strong>
        </div>
        <table className='table table-hover table-striped'>
          <thead>
            <tr>
              <th>Timeframe</th>
              <th>Gross Income</th>
              <th>Income Tax</th>
              <th>Net Income</th>
              <th>Super</th>
            </tr>
          </thead>
          <tbody>
            {
            this.props.payslipData.map((data, i) => {
              return (
                <DisplayRow key={i} data={data} />
              )
            })
          }
          </tbody>
        </table>
      </div>
    )
  }
}

ResultDisplay.propTypes = {
  payslipData: PropTypes.array,
  fullname: PropTypes.string.isRequired
}

export default ResultDisplay
