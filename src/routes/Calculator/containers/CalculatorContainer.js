import { connect } from 'react-redux'
import { calculatePayslipData } from '../actions/CalculatorActions'

/*  This is a container component. Notice it does not contain any JSX,
 nor does it import React. This component is **only** responsible for
 wiring in the actions and state necessary to render a presentational
 component - in this case, the counter:   */

import Calculator from '../components/Calculator'

/*  Object of action creators (can also be function that returns object).
 Keys will be passed as props to presentational components. Here we are
 implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    calculatePayslipData: calculatePayslipData
  }
}

const mapStateToProps = (state, stateProps) => {
  return {
    paySlipData: state.calculator.payslipData
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calculator)
