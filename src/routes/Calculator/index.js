import { injectReducer } from '../../store/reducers'

export default (store) => ({
  // path : '/',

  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Calculator = require('./containers/CalculatorContainer').default
      const reducer = require('./reducers/CalculatorReducers').default

      /*  Add the reducer to the store on key 'calculator'  */

      injectReducer(store, { key: 'calculator', reducer })

      /*  Return getComponent   */
      cb(null, Calculator)

      /* Webpack named bundle   */
    }, 'calculator')
  }
})
