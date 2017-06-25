import isInteger from 'lodash/isInteger'

const checkIntegerRange = (value, min, max) => {
  let integerValue = parseInt(value)
  if (max !== undefined) {
    return (!isInteger(integerValue) || (isInteger(integerValue) && (integerValue < min || integerValue > max)))
  } else {
    return (!isInteger(integerValue) || (isInteger(integerValue) && integerValue < min))
  }
}

export default checkIntegerRange
