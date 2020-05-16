'use strict'

const showDestinations = require('../../templates/destination-listing.handlebars')

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

const onAddDestinationFailure = error => {
  let errorMessage
  if (error === "checkLat failed" || error === "checkLong failed") {
    errorMessage = "Latitude or Longitude were entered incorrectly. Include 3 decimal places."
  } else {
    errorMessage = error.responseJSON.message
  }
  $('#new-destination-message').removeClass()
  $('#new-destination-message').addClass('failure')
  $('#new-destination-message').html(errorMessage)
  $('#new-destination-message').show()
}

const onUpdateSuccess = data => {
  console.log('working ...')
}

const onUpdateFailure = error => {
  console.error
}

module.exports = {
  onGetListSuccess,
  onGetListFailure,
  onAddDestinationFailure,
  onUpdateSuccess,
  onUpdateFailure
}


// find the city in the current Ranking
// save the currentCity to a local variable
// delete the city from the current Ranking


// update the local variables ranking
// move it to the correct spot in the array
// update the rest of the objects with their current Ranking
// send info to the database
