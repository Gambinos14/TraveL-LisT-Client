'use strict'

const ui = require('./ui.js')
const api = require('./api.js')
const getFormFields = require('../../../lib/get-form-fields.js')
const getNewDestination = require('../../../lib/get-new-destination.js')

const _ = require('lodash')

let currentUserRanking;

const updateApi = async function (ranking) {
  for (let i = 0; i < ranking.length; i++) {
    const id = ranking[i]._id
    const currentRating = i + 1
    const rating = {
      destination: {
        rating: currentRating
      }
    }
    api.changeRating(id, rating)
      .catch(console.error)
  }
}

const onGetList = event => {
  event.preventDefault()
  api.getList()
    .then(data => {
      currentUserRanking = _.sortBy(data.userDestinations, 'rating')
      console.log(currentUserRanking)
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

  // BUG IS RIGHT HERE IN TRYING TO CALL ON GET LIST IN THE THEN STATEMENT
  updateApi(newUserRanking)
    .then(() => {
      // console.log('done')
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
