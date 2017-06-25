import * as consts from 'routes/Calculator/constants/constants'
import CalculatePayslipReducer from 'routes/Calculator/reducers/CalculatorReducers'
import _ from 'lodash'

describe('Calculator reducers', () => {
  it('Should be a function.', () => {
    expect(CalculatePayslipReducer).to.be.a('function')
  })

  it('Should initialize with a state of {}.', () => {
    let defaultState = {}
    expect(CalculatePayslipReducer(defaultState, {type: ''})).to.eql(defaultState)
  })

  it('Should have payslipData data when receiving action \'RECEIVE_PAYSLIP_DATA\'.', () => {
    let defaultState = {test : 1}
    let payslipData = {
        hour: {},
        fornight: {}
    }
    let expectedState = Object.assign(defaultState, {payslipData: payslipData})
    expect(CalculatePayslipReducer(defaultState, {type: consts.RECEIVE_PAYSLIP_DATA, response: payslipData})).to.eql(expectedState)
  })

});
