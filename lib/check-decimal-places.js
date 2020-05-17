'use strict'

const checkNumberOfDecimals = num => {
  const numString = num.toString()
  const numArray = numString.split(".")
  if (numArray.length === 2) {
    if (numArray[1].length >= 3) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

module.exports = checkNumberOfDecimals
