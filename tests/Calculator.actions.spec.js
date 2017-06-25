import * as consts from 'routes/Calculator/constants/constants'
import * as actions from '../src/routes/Calculator/actions/CalculatorActions'

describe('Characters actions', () => {
  it('Should export a constant RECEIVE_PAYSLIP_DATA.', () => {
    expect(consts.RECEIVE_PAYSLIP_DATA).to.equal('RECEIVE_PAYSLIP_DATA')
  })

  describe('(Action Creator) receivePayslipData', () => {
    it('Should be exported as a function.', () => {
      expect(actions.receivePayslipData).to.be.a('function')
    })

    it('Should return an action with type "RECEIVE_PAYSLIP_DATA".', () => {
      expect(actions.receivePayslipData()).to.have.property('type', consts.RECEIVE_PAYSLIP_DATA)
    })

    it('should return an action with exact match', () => {

      const queryOptions = {
        salary: 120000,
        super: 10,
        firstname: 'jane',
        lastname: 'doe'
      }

      const expectedAction = {
        type: consts.RECEIVE_PAYSLIP_DATA,
        request: queryOptions,
        response: {}
      }

      expect(actions.receivePayslipData({
        salary: 120000,
        super: 10,
        firstname: 'jane',
        lastname: 'doe'
      }, {})).to.eql(expectedAction);

    })
  })

});
