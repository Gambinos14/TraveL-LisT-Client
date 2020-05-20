'use strict'

const authEvents = require('./auth/events.js')
const destinationEvents = require('./destinations/events.js')

$(() => {
  // auth events
  $('#sign-in-modal').modal('show')
  $('#sign-up-modal').on('hidden.bs.modal', () => {
      $('#sign-up-message').text('')
      $('#sign-up-form').trigger('reset')
    })
  $('#sign-in-modal').on('hidden.bs.modal', () => {
      $('#sign-in-message').text('')
      $('#sign-in-form').trigger('reset')
    })
  $('#change-pw-modal').on('hidden.bs.modal', () => {
      $('#change-pw-message').text('')
      $('#change-pw-form').trigger('reset')
    })
  $('#sign-up-form').on('submit', authEvents.onSignUp)
  $('#sign-in-form').on('submit', authEvents.onSignIn)
  $('#change-pw-form').on('submit', authEvents.onChangePassword)
  $('#logout').on('click', authEvents.onSignOut)

  //destination events
  $('.bucket-list').on('click', destinationEvents.onGetList)
  $('#new-destination').on('click', () => {
    $('#destinations-failure').html('')
    $('#destinations-failure').hide()
  })
  $('#new-destination-form').on('submit', destinationEvents.onAddDestination)
  $('#new-destination-modal').on('hidden.bs.modal', () => {
      $('#new-destination-message').text('')
      $('#new-destination-form').trigger('reset')
    })
  $('#change-ranking-form').on('submit', destinationEvents.onChangeRating)
  $('#change-ranking-modal').on('hidden.bs.modal', () => {
      $('#change-ranking-message').text('')
      $('#change-ranking-form').trigger('reset')
    })
  //destination-list events
  $('#destinations').on('click', '.destination-li', destinationEvents.onShowDestination)
  $('#li-modal-body').on('click', '.delete-button', destinationEvents.onDeleteDestination)
})
