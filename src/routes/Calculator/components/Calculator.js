import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { isInteger, forOwn } from 'lodash'
import checkIntegerRange from '../../../helpers/checkIntegerRange'
import ResultDisplay from './ResultDisplay'

class Calculator extends Component {
  constructor (props) {
    super(props)

    this.state = {
      formInput: {
        firstname: '',
        lastname: '',
        salary: '',
        super: ''
      },
      formError: {
        firstname: false,
        lastname: false,
        salary: false,
        super: false
      },
      isFormValid: false
    }

    this.updateField = this.updateField.bind(this)
    this.validateInput = this.validateInput.bind(this)
    this.calculatePayslip = this.calculatePayslip.bind(this)
  }

  updateField (e) {
    let value = e.target.value.trim()
    let fieldName = e.target.name
    let formInput = Object.assign({}, this.state.formInput)
    let formError = Object.assign({}, this.state.formError)
    if (e.target.type === 'number') {
      value = isInteger(parseInt(value)) ? parseInt(value) : value
    }
    formInput[fieldName] = value

    let error = this.validateInput(fieldName, value)
    this.setState({ formError: error || formError, formInput: formInput }, () => {
      let allFieldsValid = this.checkAllFieldsValidated()
      this.setState({ isFormValid: allFieldsValid })
    })
  }

  validateInput (fieldName, value) {
    if (value === '') return null

    let error = Object.assign({}, this.state.formError)

    switch (fieldName) {
      case 'firstname':
      case 'lastname':
        error[fieldName] = (value === '')
        break
      case 'salary':
        error[fieldName] = checkIntegerRange(value, 0)
        break
      case 'super':
        error[fieldName] = checkIntegerRange(value, 0, 50)
        break
      default:
        break
    }
    return error
  }

  checkAllFieldsValidated () {
    let formInput = this.state.formInput
    let formError = this.state.formError
    let allFieldsValid = true
    forOwn(formInput, (value) => {
      if (value === '') allFieldsValid = false
    })
    forOwn(formError, (error) => {
      if (error) allFieldsValid = false
    })

    return allFieldsValid
  }

  scrollToBottom = () => {
    const node = ReactDOM.findDOMNode(this.resultDisplay)
    node.scrollIntoView({ behavior: 'smooth' })
  }

  calculatePayslip (e) {
    e.preventDefault()
    this.props.dispatch(this.props.calculatePayslipData(this.state.formInput))
    setTimeout(() => {
      this.scrollToBottom()
    }, 200)
  }

  render () {
    let formError = this.state.formError
    let formInput = this.state.formInput
    return (
      <div className='container'>
        <form className='col-sm-6 offset-sm-3'>
          <div className={`form-group row ${formError.firstname ? 'has-danger' : ''}`}>
            <label className='sr-only' htmlFor='firstname'>First Name</label>
            <label className='col-sm-4 col-form-label' htmlFor='firstname'>First Name</label>
            <div className='col-sm-8'>
              <input type='text' className={`form-control ${formError.firstname ? 'form-control-danger' : ''}`}
                     value={formInput.firstname}
                     id='firstname'
                     name='firstname'
                     placeholder='First name'
                     onChange={this.updateField} />
              <div className={`form-control-feedback ${formError.firstname ? '' : 'invisible'}`}>Sorry, please enter a valid name.</div>
            </div>
          </div>

          <div className={`form-group row ${formError.lastname ? 'has-danger' : ''}`}>
            <label className='sr-only' htmlFor='firstname'>Last Name</label>
            <label className='col-sm-4 col-form-label' htmlFor='lastname'>Last Name</label>
            <div className='col-sm-8'>
              <input type='text'
                     className={`form-control ${formError.lastname ? 'form-control-danger' : ''}`}
                     value={formInput.lastname}
                     id='lastname'
                     name='lastname'
                     placeholder='Last name'
                     onChange={this.updateField} />
              <div className={`form-control-feedback ${formError.lastname ? '' : 'invisible'}`}>Sorry, please enter a valid name.</div>
            </div>
          </div>

          <div className={`form-group row ${formError.salary ? 'has-danger' : ''}`}>
            <label className='sr-only' htmlFor='firstname'>Annual Salary</label>
            <label className='col-sm-4 col-form-label' htmlFor='salary'>Annual Salary</label>
            <div className='col-sm-8'>
              <input type='number'
                     className={`form-control ${formError.salary ? 'form-control-danger' : ''}`}
                     value={formInput.salary}
                     id='salary'
                     name='salary'
                     placeholder='Salary'
                     onChange={this.updateField} />
              <div className={`form-control-feedback ${formError.salary ? '' : 'invisible'}`}>Sorry, please enter a valid number above 0.</div>
            </div>
          </div>

          <div className={`form-group row ${formError.super ? 'has-danger' : ''}`}>
            <label className='sr-only' htmlFor='super'>Super rate</label>
            <label className='col-sm-4 col-form-label' htmlFor='super'>Super rate</label>
            <div className='col-sm-8'>
              <div className='input-group'>
                <input type='number'
                       className={`form-control ${formError.super ? 'form-control-danger' : ''}`}
                       value={formInput.super}
                       id='super'
                       name='super'
                       placeholder='Super rate, 0~50'
                       onChange={this.updateField} />
                <div className='input-group-addon'>%</div>
              </div>
              <div className={`form-control-feedback ${formError.super ? '' : 'invisible'}`}>Sorry, please enter a valid number between 0 and 50.</div>
            </div>
          </div>

          <button type='submit'
                  disabled={!this.state.isFormValid}
                  className={`btn btn-primary d-block mx-auto ${this.state.isFormValid ? '' : 'disabled'}`}
                  onClick={this.calculatePayslip}>
            <i className='fa fa-calculator' /> Calculate
          </button>

        </form>
        <hr />
        <ResultDisplay ref={(el) => { this.resultDisplay = el }} payslipData={this.props.paySlipData}
          fullname={formInput.firstname + ' ' + formInput.lastname} />
      </div>
    )
  }
}

Calculator.propTypes = {
  dispatch: PropTypes.func.isRequired,
  calculatePayslipData: PropTypes.func
}

export default Calculator
