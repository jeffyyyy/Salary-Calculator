import React from 'react'
import PropTypes from 'prop-types'
import './PageLayout.scss'

export const PageLayout = ({ children }) => (
  <div className='container-fluid'>
    <div className='text-center'>
      <div className='jumbotron bg-success'>
        <h1 className='header'>Welcome to Salary Calculator</h1>
      </div>
    </div>
    <div className='page-layout__viewport'>
      {children}
    </div>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
