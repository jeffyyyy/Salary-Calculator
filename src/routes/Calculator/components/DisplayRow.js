import React, { Component } from 'react'
import PropTypes from 'prop-types'
import numberWithCommas from '../../../helpers/numberWithCommas'

class DisplayRow extends Component {

  render () {
    if (!this.props.data) return null
    let data = this.props.data
    return (
      <tr>
        <td>{data.type}</td>
        <td>${numberWithCommas(data.grossIncome)}</td>
        <td>${numberWithCommas(data.incomeTax)}</td>
        <td>${numberWithCommas(data.netIncome)}</td>
        <td>${numberWithCommas(data.super)}</td>
      </tr>
    )
  }
}

DisplayRow.propTypes = {
  data: PropTypes.object.isRequired
}

export default DisplayRow
