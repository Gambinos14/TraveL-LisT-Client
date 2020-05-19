'use strict'

const onSignUpSuccess = data => {
  $('#sign-up-form').trigger('reset')
  $('#sign-up-modal').modal('hide')
  $('#sign-in-modal').modal('show')
}

const onSignUpFailure = error => {
  $('#sign-up-form').trigger('reset')
  let errorMessage = error.responseJSON.message
  if (errorMessage === 'The receieved params failed a Mongoose validation') {
    errorMessage = 'Email has already been used'
  }
  $('#sign-up-message').removeClass()
  $('#sign-up-message').addClass('failure')
  $('#sign-up-message').text(errorMessage)
}

const onSignInSuccess = data => {
  $('#sign-in-form').trigger('reset')
  $('#sign-in-modal').modal('hide')
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('#change-pw').show()
  $('#logout').show()
  $('.buttons').css('display', 'flex')
}

const onSignInFailure = error => {
  $('#sign-in-form').trigger('reset')
  let errorMessage = error.responseJSON.message
  $('#sign-in-message').removeClass()
  $('#sign-in-message').addClass('failure')
  $('#sign-in-message').text(errorMessage)
}

const onChangePasswordSuccess = data => {
  $('#change-pw-form').trigger('reset')
  $('#change-pw-message').removeClass()
  $('#change-pw-message').addClass('success')
  $('#change-pw-message').text('Password Updated!')
}

const onChangePasswordFailure = error => {
  $('#change-pw-form').trigger('reset')
  const errorMessage = error.responseJSON.message
  $('#change-pw-message').removeClass()
  $('#change-pw-message').addClass('failure')
  $('#change-pw-message').text(errorMessage)
}

const onSignOutSuccess = data => {
  $('#sign-up').show()
  $('#sign-in').show()
  $('#change-pw').hide()
  $('#logout').hide()
  $('.buttons').hide()
  $('#destinations').html("")
  $('#destinations-failure').html('')
  $('#destinations-failure').hide()

  const mapOptions = {
    center: {lat: 36.9372, lng: -20.6376},
    zoom: 2
  }
  const map = new google.maps.Map(document.getElementById("map"), mapOptions)
}

const onSignOutFailure = error => {
  $('.error_message').removeClass()
  $('.error_message').addClass('failure')
  const errorMessage = "There was an issue signing out..."
  $('.error_message').text(errorMessage)
  $('.error_message').show()
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure,
  onSignOutSuccess,
  onSignOutFailure
}
