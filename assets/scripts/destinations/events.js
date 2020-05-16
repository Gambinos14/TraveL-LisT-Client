'use strict'

const ui = require('./ui.js')
const api = require('./api.js')
const getFormFields = require('../../../lib/get-form-fields.js')
const _ = require('lodash')

let currentUserRanking;

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
  event.preventDefault()
  api.getList()
    .then(data => {
      currentUserRanking = _.sortBy(data.userDestinations, 'rating')
      console.log('onGetList ranking: ', currentUserRanking)
      ui.onGetListSuccess(currentUserRanking)
    })
    .catch(ui.onGetListFailure)
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
    ui.onAddDestinationFailure('checkLat failed')
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
    ui.onAddDestinationFailure('checkLong failed')
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
    .then(response => {
      onGetList(event)
      $('#new-destination-form').trigger('reset')
      $('#new-destination-modal').modal('hide')
    })
    .catch(ui.onAddDestinationFailure)
}

const onChangeRating = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)

  const newRanking = formData.destination.rating
  const cityIndex = currentUserRanking.map(e => e._id).indexOf(formData.id)
  const currentCity = currentUserRanking[cityIndex]
  currentCity.rating = newRanking

  const newUserRanking = currentUserRanking.filter( element => {
    if (element !== currentCity) {
      return true
    }
  })

  newUserRanking.splice((newRanking - 1), 0, currentCity)

  newUserRanking.forEach( (element, index) => {
    newUserRanking[index].rating = index + 1
  })

  console.log(newUserRanking)

const updateRanking = async function() {
  for (let i = 0; i < newUserRanking.length; i++) {
    const id = newUserRanking[i]._id
    const rating = {
      destination: {
        rating: newUserRanking[i].rating
      }
    }
    api.changeRating(id, rating)
      .then(ui.onUpdateSuccess)
      .catch(ui.onUpdateFailure)
  }
}

updateRanking()
  .then(() => {
    onGetList(event)
  })
  // api.changeRating(id, rating)
  //   .then(console.log)
  //   .catch(console.error)
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
