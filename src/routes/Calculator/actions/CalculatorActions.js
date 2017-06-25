import * as consts from '../constants/constants'

export function calculatePayslipData (p = {}) {
  let cloneObj = Object.assign({}, p)

  return dispatch => {
    return fetch('/api/v1/calculator', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cloneObj)
    })
      .then(function (response) {
        if (response.status >= 200 && response.status < 300) {
          return response.json()
        } else {
          return null
        }
      })
      .then(function (json) {
        if (json) dispatch(receivePayslipData(p, json))
      })
  }
}

export function receivePayslipData (request, response) {
  return {
    type: consts.RECEIVE_PAYSLIP_DATA,
    request,
    response
  }
}
