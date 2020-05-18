'use strict'

const showDestinations = require('../../templates/destination-listing.handlebars')
const updateModal = require('../../templates/listItem-modal.handlebars')

const onGetListSuccess = data => {
  const userDestinationsHtml = showDestinations({ destinations: data })
  $('#destinations').html(userDestinationsHtml)
}

const onGetListFailure = error => {
  $('.destinations-failure').removeClass()
  $('.destinations-failure').addClass('failure')
  const errorMessage = 'Please try again later ...'
  $('.destinations-failure').html(errorMessage)
  $('.destinations-failure').show()
}

const onAddDestinationSuccess = () => {
  $('#new-destination-form').trigger('reset')
  $('#new-destination-modal').modal('hide')
}

const onAddDestinationFailure = error => {
  let errorMessage
  if (error === "checkLat failed" || error === "checkLong failed") {
    errorMessage = "Latitude or Longitude were entered incorrectly. Include 3 decimal places."
  } else if (error ==='Failed to Update API') {
    errorMessage = error
  } else {
    errorMessage = error.responseJSON.message
  }
  $('#new-destination-message').removeClass()
  $('#new-destination-message').addClass('failure')
  $('#new-destination-message').html(errorMessage)
  $('#new-destination-message').show()
}

const onChangeRatingSuccess = () => {
  $('#change-ranking-modal').modal('hide')
  $('#change-ranking-form').trigger('reset')
}

const onChangeRatingFailure = error => {
  let errorMessage;
  if (error.responseJSON) {
    errorMessage = error.responseJSON.message
  } else if (error === 'City does not exist!') {
    errorMessage = error
  } else {
    errorMessage = 'Failed to Update Destination Ratings'
  }
  $('#change-ranking-message').removeClass()
  $('#change-ranking-message').addClass('failure')
  $('#change-ranking-message').html(errorMessage)
  $('#change-ranking-message').show()
}

const onShowSuccess = data => {
  const newModalHtml = updateModal(data.destination)
  $('#li-modal-body').html(newModalHtml)
  $('#list-item-modal').modal('show')
}

const onShowFailure = error => {
  let errorMessage
  if (error.responseJSON) {
    errorMessage = error.responseJSON.message
  } else {
    errorMessage = 'Could not find this destination ...'
  }
  $('#li-modal-body').html(errorMessage)
  $('#list-item-modal').modal('show')
}

const onDeleteDestinationSuccess = () => {
  $('#list-item-modal').modal('hide')
}

const onDeleteDestinationFailure = () => {
  $('#delete-failed-text').removeClass()
  $('#delete-failed-text').addClass('failure')
  $('#delete-failed-text').html('Failed to Delete Destination')
  $('#delete-failed-text').show()
}

module.exports = {
  onGetListSuccess,
  onGetListFailure,
  onAddDestinationSuccess,
  onAddDestinationFailure,
  onChangeRatingSuccess,
  onChangeRatingFailure,
  onShowSuccess,
  onShowFailure,
  onDeleteDestinationFailure,
  onDeleteDestinationSuccess
}
