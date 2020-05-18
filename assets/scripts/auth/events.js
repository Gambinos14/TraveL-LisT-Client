'use strict'

const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')

const onSignUp = (event) => {
  event.preventDefault()
  $('#sign-up-message').text('')
  const form = event.target
  const formData = getFormFields(form)

  api.signUp(formData)
   .then(ui.onSignUpSuccess)
   .catch(ui.onSignUpFailure)
}

const onSignIn = (event) => {
  event.preventDefault()
  $('#sign-in-message').text('')
  const form = event.target
  const formData = getFormFields(form)

  api.signIn(formData)
   .then(data => {
     store.user = data.user
     ui.onSignInSuccess(data)
   })
   .catch(ui.onSignInFailure)
}

const onChangePassword = (event) => {
  event.preventDefault()
  $('#change-pw-message').text('')
  const form = event.target
  const formData = getFormFields(form)

  api.changePassword(formData)
   .then(ui.onChangePasswordSuccess)
   .catch(ui.onChangePasswordFailure)
}

const onSignOut = (event) => {
  api.signOut()
    .then(() => {
      ui.onSignOutSuccess()
      store.user = null
    })
    .catch(ui.onSignOutFailure)

}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut
}
