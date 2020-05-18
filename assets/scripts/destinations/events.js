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
      console.log('onGetList: ', currentUserRanking)
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
        .catch(ui.onAddDestinationFailure('Failed to Update API'))
    })
    .catch(ui.onAddDestinationFailure)
}

const onChangeRating = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)

  const newRating = formData.destination.rating
  const cityIndex = currentUserRanking.map(e => e.city).indexOf(formData['city-name'])
  const currentCity = currentUserRanking[cityIndex]
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
      onGetList(event)
      $('#change-ranking-modal').modal('hide')
      $('#change-ranking-form').trigger('reset')
    })
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
