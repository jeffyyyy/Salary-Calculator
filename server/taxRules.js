/*
 * Income Tax Rules
 */
module.exports = {
  rule: [
    {
      code: 1,
      description: 'Salary between 0 ~ $18,200',
      minIncome: 1,
      maxIncome: 18200,
      minTax: 0,
      rate: 0
    },
    {
      code: 2,
      description: 'Salary between $18,200 ~ $37,000',
      minIncome: 18201,
      maxIncome: 37000,
      minTax: 0,
      rate: 0.19
    },
    {
      code: 3,
      description: 'Salary between $37,001 ~ $80,000',
      minIncome: 37001,
      maxIncome: 80000,
      minTax: 3572,
      rate: 0.325
    },
    {
      code: 4,
      description: 'Salary between $80,001 ~ $180,000',
      minIncome: 80001,
      maxIncome: 180000,
      minTax: 17547,
      rate: 0.37
    },
    {
      code: 5,
      description: 'Salary above $180,000',
      minIncome: 180001,
      minTax: 54547,
      rate: 0.45
    }
  ]
}
