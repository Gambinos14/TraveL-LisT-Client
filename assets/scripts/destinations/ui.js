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

const onUpdateSuccess = () => {
  console.log('updating .... ')
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

module.exports = {
  onGetListSuccess,
  onGetListFailure,
  onAddDestinationSuccess,
  onAddDestinationFailure,
  onUpdateSuccess,
  onShowSuccess,
  onShowFailure
}


// find the city in the current Ranking
// save the currentCity to a local variable
// delete the city from the current Ranking


// update the local variables ranking
// move it to the correct spot in the array
// update the rest of the objects with their current Ranking
// send info to the database
