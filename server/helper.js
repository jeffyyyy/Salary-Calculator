'use strict'
const taxRules = require('./taxRules').rule
const _ = require('lodash')

const calculateTotalTaxPaid = (annualIncome, superRate) => {
  return new Promise((resolve, reject) => {
    let taxRule = _.filter(taxRules, (rule) => {
      if (rule.maxIncome !== undefined) {
        return annualIncome >= rule.minIncome && annualIncome <= rule.maxIncome
      } else {
        return annualIncome >= rule.minIncome
      }
    })
    if (taxRule.length) {
      taxRule = taxRule[0]
      let totalTax = taxRule.minTax + (annualIncome - taxRule.minIncome + 1) * taxRule.rate
      resolve({ annualIncome: annualIncome, super: superRate, totalTax: totalTax })
    } else {
      resolve({ annualIncome: 0, super: superRate, totalTax: 0 })
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
  return calculateTotalTaxPaid(data.salary, data.super).then(constructPayslip)
}

module.exports = {
  calculateTotalTaxPaid: calculateTotalTaxPaid,
  constructPayslip: constructPayslip,
  calculatePayslip: calculatePayslip
}
