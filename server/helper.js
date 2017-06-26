'use strict'
const taxRules = require('./taxRules').rule
const salaryInputRules = require('./salaryInputValidationRules')
const _ = require('lodash')

const validateSalaryDataInput = (data) => {
  return new Promise((resolve, reject) => {
    if (!_.isInteger(data.salary) || !_.isInteger(data.super)) reject(new Error('Invalid input - Salary or Super not integer'))

    if (_.isInteger(data.salary) && (data.salary < salaryInputRules.salary.min || data.salary > salaryInputRules.salary.max)) {
      reject(new Error('Invalid input - Salary range out of boundary'))
    }
    if (_.isInteger(data.super) && (data.super < salaryInputRules.super.min || data.super > salaryInputRules.super.max)) {
      reject(new Error(`Invalid input - Super range out of boundary, must be within range of ${salaryInputRules.super.min} and ${salaryInputRules.super.max}`))
    }

    resolve(data)
  })
}

const calculateTotalTaxPaid = (data) => {
  return new Promise((resolve, reject) => {
    let taxRule = _.filter(taxRules, (rule) => {
      if (rule.maxIncome !== undefined) {
        return data.salary >= rule.minIncome && data.salary <= rule.maxIncome
      } else {
        return data.salary >= rule.minIncome
      }
    })
    if (taxRule.length) {
      taxRule = taxRule[0]
      let totalTax = taxRule.minTax + (data.salary - taxRule.minIncome + 1) * taxRule.rate
      resolve({ annualIncome: data.salary, super: data.super, totalTax: totalTax })
    } else {
      resolve({ annualIncome: 0, super: data.super, totalTax: 0 })
    }
  })
}

const constructPayslip = (data) => {
  return new Promise((resolve, reject) => {
    let payslipIntervals = ['hour', 'week', 'fornight', 'month']
    let annualResult = {
      grossIncome: data.annualIncome,
      incomeTax: data.totalTax,
      netIncome: data.annualIncome - data.totalTax,
      super: data.super * data.annualIncome / 100
    }

    let output = []
    payslipIntervals.forEach((payInterval) => {
      let divideby
      switch (payInterval) {
        case 'hour':
          divideby = 2080
          break
        case 'week':
          divideby = 52
          break
        case 'fornight':
          divideby = 26
          break
        case 'month':
          divideby = 12
          break
        default:
          divideby = 12
          break
      }
      let eachResult = {
        type: payInterval
      }
      _.forOwn(annualResult, (value, key) => {
        eachResult[key] = Math.round(value / divideby)
      })
      output.push(eachResult)
    })
    resolve(output)
  })
}

const calculatePayslip = (data) => {
  return validateSalaryDataInput(data).then(calculateTotalTaxPaid).then(constructPayslip)
}

module.exports = {
  validateSalaryDataInput: validateSalaryDataInput,
  calculateTotalTaxPaid: calculateTotalTaxPaid,
  constructPayslip: constructPayslip,
  calculatePayslip: calculatePayslip
}
