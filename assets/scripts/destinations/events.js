'use strict'

const ui = require('./ui.js')
const api = require('./api.js')
const getFormFields = require('../../../lib/get-form-fields.js')

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

const onGetList = event => {
  api.getList()
    .then(data=> {
      console.log('getList worked')
      console.log(data)
    })
    .catch(console.error)
}

const onAddDestination = event => {
  event.preventDefault()
  const formData = {
    destination: {}
  }
  const form = event.target
  formData.destination.city = $(form).find('input[name="city"]').val()
  formData.destination.country = $(form).find('input[name="country"]').val()

  const latitude = $(form).find('input[name="latitude"]').val()
  const checkLat = checkNumberOfDecimals(latitude)
  if (!checkLat) {
    console.log('checkLat Failed')
    throw new Error
    // ui.onAddDestinationFailed()
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
    throw new Error
    // ui.onAddDestinationFailed()
  }

  const longDirection = $('#long-direction').val()
  if (longDirection === 'east') {
    formData.destination.longitude = longitude
  } else {
    formData.destination.longitude = (0 - longitude).toString()
  }

  formData.destination.rating = $(form).find('input[name="rating"]').val()

  console.log(formData)

  api.addDestination(formData)
    .then(ui.onAddDestinationSuccess)
    .catch(ui.onAddDestinationFailure)
}

const onChangeRating = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  const id = formData.id
  const rating = {}
  rating.destination = formData.destination
  // console.log('id: ', id)
  // console.log('newRating: ', rating)

  api.changeRating(id, rating)
    .then(console.log)
    .catch(console.error)
}

const onDeleteDestination = event => {
  event.preventDefault()
  const form = event.target
  const destinationId = $(form).find('input[name="id"]').val()
  api.deleteDestination(destinationId)
    .then(console.log)
    .catch(console.error)
}

module.exports = {
  onGetList,
  onAddDestination,
  onChangeRating,
  onDeleteDestination
}
