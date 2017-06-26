'use strict'

import * as helper from '../server/helper'

describe('Calculator unit tests', () => {
  it('calculateTotalTaxPaid Should be a function.', () => {
    expect(helper.calculateTotalTaxPaid).to.be.a('function')
  })

  it('constructPayslip Should be a function.', () => {
    expect(helper.constructPayslip).to.be.a('function')
  })

  it('calculatePayslip Should be a function.', () => {
    expect(helper.calculatePayslip).to.be.a('function')
  })

  describe('Should fail given input is invalid', () => {
    it('given input salary is -10, super 10%', () => {
      let initialResult = { salary: -10, super: 10};
      let result = helper.validateSalaryDataInput(initialResult)
      return expect(result).to.be.rejected
    })

    it('given input salary is -100, super -20%', () => {
      let initialResult = { salary: -100, super: -20};
      let result = helper.validateSalaryDataInput(initialResult)
      return expect(result).to.be.rejected
    })

    it('given input salary is 100, super 60%', () => {
      let initialResult = { salary: 100, super: 60};
      let result = helper.validateSalaryDataInput(initialResult)
      return expect(result).to.be.rejected
    })
  })

  describe('Should calculate correct result when income is $10000, super 10%', () => {
    it('should calculate correct tax result', () => {
      let expectedResult = { annualIncome: 10000, super: 10, totalTax: 0 };
      let result = helper.calculateTotalTaxPaid({salary: 10000, super: 10})
      return expect(result).to.eventually.deep.equal(expectedResult)
    })

    it('should generate correct payslip data', () => {
      let initialResult = { annualIncome: 10000, super: 10, totalTax: 0 };
      let expectedResult = [
        {
          type: 'hour',
          grossIncome: 5,
          incomeTax: 0,
          netIncome: 5,
          super: 0
        },
        {
          type: 'week',
          grossIncome: 192,
          incomeTax: 0,
          netIncome: 192,
          super: 19
        },
        {
          type: 'fornight',
          grossIncome: 385,
          incomeTax: 0,
          netIncome: 385,
          super: 38
        },
        {
          type: 'month',
          grossIncome: 833,
          incomeTax: 0,
          netIncome: 833,
          super: 83
        }
      ]
      let result = helper.constructPayslip(initialResult)
      return expect(result).to.eventually.deep.equal(expectedResult)
    })
  })


  describe('Should calculate correct result when income is $36999, super 20%', () => {
    it('should calculate correct tax result', () => {
      let expectedResult = { annualIncome: 36999, super: 20, totalTax: 3571.81 };
      let result = helper.calculateTotalTaxPaid({salary: 36999, super: 20})
      return expect(result).to.eventually.deep.equal(expectedResult)
    })

    it('should generate correct payslip data', () => {
      let initialResult = { annualIncome: 36999, super: 20, totalTax: 3571.81 };
      let expectedResult = [
        {
          type: 'hour',
          grossIncome: 18,
          incomeTax: 2,
          netIncome: 16,
          super: 4
        },
        {
          type: 'week',
          grossIncome: 712,
          incomeTax: 69,
          netIncome: 643,
          super: 142
        },
        {
          type: 'fornight',
          grossIncome: 1423,
          incomeTax: 137,
          netIncome: 1286,
          super: 285
        },
        {
          type: 'month',
          grossIncome: 3083,
          incomeTax: 298,
          netIncome: 2786,
          super: 617
        }
      ]
      let result = helper.constructPayslip(initialResult)
      return expect(result).to.eventually.deep.equal(expectedResult)
    })
  })

  describe('Should calculate correct result when income is $65000, super 15%', () => {
    it('should calculate correct tax result', () => {
      let expectedResult = { annualIncome: 65000, super: 15, totalTax: 12672 };
      let result = helper.calculateTotalTaxPaid({salary: 65000, super: 15})
      return expect(result).to.eventually.deep.equal(expectedResult)
    })

    it('should generate correct payslip data', () => {
      let initialResult = { annualIncome: 65000, super: 15, totalTax: 12672 };
      let expectedResult = [
        {
          type: 'hour',
          grossIncome: 31,
          incomeTax: 6,
          netIncome: 25,
          super: 5
        },
        {
          type: 'week',
          grossIncome: 1250,
          incomeTax: 244,
          netIncome: 1006,
          super: 188
        },
        {
          type: 'fornight',
          grossIncome: 2500,
          incomeTax: 487,
          netIncome: 2013,
          super: 375
        },
        {
          type: 'month',
          grossIncome: 5417,
          incomeTax: 1056,
          netIncome: 4361,
          super: 813
        }
      ]
      let result = helper.constructPayslip(initialResult)
      return expect(result).to.eventually.deep.equal(expectedResult)
    })
  })

  describe('Should calculate correct result when income is $155000, super 15%', () => {
    it('should calculate correct tax result', () => {
      let expectedResult = { annualIncome: 155000, super: 15, totalTax: 45297 };
      let result = helper.calculateTotalTaxPaid({salary: 155000, super: 15})
      return expect(result).to.eventually.deep.equal(expectedResult)
    })

    it('should generate correct payslip data', () => {
      let initialResult = { annualIncome: 155000, super: 15, totalTax: 45297 };
      let expectedResult = [
        {
          type: 'hour',
          grossIncome: 75,
          incomeTax: 22,
          netIncome: 53,
          super: 11
        },
        {
          type: 'week',
          grossIncome: 2981,
          incomeTax: 871,
          netIncome: 2110,
          super: 447
        },
        {
          type: 'fornight',
          grossIncome: 5962,
          incomeTax: 1742,
          netIncome: 4219,
          super: 894
        },
        {
          type: 'month',
          grossIncome: 12917,
          incomeTax: 3775,
          netIncome: 9142,
          super: 1938
        }
      ]
      let result = helper.constructPayslip(initialResult)
      return expect(result).to.eventually.deep.equal(expectedResult)
    })
  })

});
