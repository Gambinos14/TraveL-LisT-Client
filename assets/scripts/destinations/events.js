'use strict'

const ui = require('./ui.js')
const api = require('./api.js')
const getFormFields = require('../../../lib/get-form-fields.js')
const getNewDestination = require('../../../lib/get-new-destination.js')

const _ = require('lodash')

let currentUserRanking;

const onGetList = event => {
  event.preventDefault()
  api.getList()
    .then(data => {
      currentUserRanking = _.sortBy(data.userDestinations, 'rating')
      // console.log('onGetList: ', currentUserRanking)
      ui.onGetListSuccess(currentUserRanking)
    })
    .catch(ui.onGetListFailure)
}

const onAddDestination = event => {
  event.preventDefault()
  const form = event.target
  const formData = getNewDestination(form)

  if (formData === 'checkLong failed' || formData === 'checkLat failed') {
    ui.onAddDestinationFailure(formData)
  }

  api.addDestination(formData)
    .then(data => {

      currentUserRanking.splice((data.destination.rating - 1), 0, data.destination)

      const promises = []

      for (let i = 0; i < currentUserRanking.length; i++) {
        const id = currentUserRanking[i]._id
        const currentRating = i + 1
        const rating = {
          destination: {
            rating: currentRating
          }
        }
        promises.push(api.changeRating(id, rating))
      }

      Promise.all(promises)
        .then(() => {
          ui.onAddDestinationSuccess()
          onGetList(event)
        })
    })
    .catch(ui.onAddDestinationFailure)
}

const onChangeRating = event => {
  event.preventDefault()
  const form = event.target

  const newRating = $(form).find('input[name="new-rating"]').val()
  const cityName = $(form).find('input[name="city-name"]').val().trim()

  const cityIndex = currentUserRanking.map(e => e.city).indexOf(cityName)
  const currentCity = currentUserRanking[cityIndex]

  if (!currentCity) {
    ui.onChangeRatingFailure('City does not exist!')
    return
  }

  currentCity.rating = newRating

  const newUserRanking = currentUserRanking.filter( element => {
    if (element !== currentCity) {
      return true
    }
  })

  newUserRanking.splice((newRating - 1), 0, currentCity)

  const promises = []

  for (let i = 0; i < newUserRanking.length; i++) {
    const id = newUserRanking[i]._id
    const currentRating = i + 1
    const rating = {
      destination: {
        rating: currentRating
      }
    }
    promises.push(api.changeRating(id, rating))
  }

  Promise.all(promises)
    .then(() => {
      ui.onChangeRatingSuccess()
      onGetList(event)
    })
    .catch(ui.onChangeRatingFailure)
}

const onDeleteDestination = event => {
  event.preventDefault()

  const destinationId = $(event.target).data('id')

  api.deleteDestination(destinationId)
    .then(() => {
      // if error add back onDeleteDestinationSuccess()
      // if error add back here onGetList(event)
      // upon success include an API call to edit rankings in the database
      const cityIndex = currentUserRanking.map(e => e._id).indexOf(destinationId)
      const currentCity = currentUserRanking[cityIndex]

      const newUserRanking = currentUserRanking.filter( element => {
        if (element !== currentCity) {
          return true
        }
      })

      const promises = []

      for (let i = 0; i < newUserRanking.length; i++) {
        const id = newUserRanking[i]._id
        const currentRating = i + 1
        const rating = {
          destination: {
            rating: currentRating
          }
        }
        promises.push(api.changeRating(id, rating))
      }

      Promise.all(promises)
        .then(() => {
          ui.onDeleteDestinationSuccess()
          onGetList(event)
        })
        .catch(ui.onDeleteDestinationFailure)
    })
    .catch(ui.onDeleteDestinationFailure)
}

const onShowDestination = event => {
  const destinationId = $(event.target).data('id')

  api.onShow(destinationId)
    .then(ui.onShowSuccess)
    .catch(ui.onShowFailure)
}

module.exports = {
  onGetList,
  onAddDestination,
  onChangeRating,
  onDeleteDestination,
  onShowDestination
}
