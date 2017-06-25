
export default function CalculatePayslipReducer (state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_PAYSLIP_DATA':
      let clone = Object.assign({}, state)
      clone.payslipData = action.response
      return clone
    default:
      return state
  }
}
