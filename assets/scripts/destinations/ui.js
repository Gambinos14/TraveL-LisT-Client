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

const onShowSuccess = data => {
  console.log('current info is: ', data)
  const newModalHtml = updateModal(data.destination)
  $('#li-modal-body').html(newModalHtml)
  $('#list-item-modal').modal('show')
}

const onShowFailure = error => {
  console.log('onShowFailure ran')
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
  onShowSuccess,
  onShowFailure,
  onDeleteDestinationFailure
}
