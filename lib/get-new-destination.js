'use strict'

const checkNumberOfDecimals = require('./check-decimal-places.js')

const getNewDestination = form => {

  const formData = {
    destination: {}
  }

  formData.destination.city = $(form).find('input[name="city"]').val()
  formData.destination.country = $(form).find('input[name="country"]').val()

  const latitude = $(form).find('input[name="latitude"]').val()
  const checkLat = checkNumberOfDecimals(latitude)
  if (!checkLat) {
    console.log('checkLat Failed')
    return 'checkLat failed'
  }
  const latDirection = $('#lat-direction').val()
  if (latDirection === 'north') {
    formData.destination.latitude = latitude
  } else {
    formData.destination.latitude = (0 - latitude).toString()
  }


  const longitude = $(form).find('input[name="longitude"]').val()
  const checkLong = checkNumberOfDecimals(longitude)
  if (!checkLong) {
    console.log('checkLong Failed')
    return 'checkLong failed'
  }

  const longDirection = $('#long-direction').val()
  if (longDirection === 'east') {
    formData.destination.longitude = longitude
  } else {
    formData.destination.longitude = (0 - longitude).toString()
  }

  formData.destination.rating = $(form).find('input[name="rating"]').val()

  return formData
}

module.exports = getNewDestination
