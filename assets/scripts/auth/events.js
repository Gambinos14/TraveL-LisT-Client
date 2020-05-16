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
  // console.log(formData)

  api.signUp(formData)
   .then(ui.onSignUpSuccess)
   .catch(ui.onSignUpFailure)
}

const onSignIn = (event) => {
  event.preventDefault()
  $('#sign-in-message').text('')
  // console.log("Current Store: ", store.user)
  const form = event.target
  const formData = getFormFields(form)
  // console.log(formData)

  api.signIn(formData)
   .then(data => {
     store.user = data.user
     ui.onSignInSuccess(data)
     // console.log('Store: ', store.user)
     // console.log('Token: ', store.user.token)
   })
   .catch(ui.onSignInFailure)
}

const onChangePassword = (event) => {
  event.preventDefault()
  $('#change-pw-message').text('')
  const form = event.target
  const formData = getFormFields(form)
  console.log(formData)

  api.changePassword(formData)
   .then(ui.onChangePasswordSuccess)
   .catch(ui.onChangePasswordFailure)
}

const onSignOut = (event) => {
  api.signOut()
    .then(() => {
      ui.onSignOutSuccess()
      store.user = null
      console.log(store.user)
    })
    .catch(ui.onSignOutFailure)

}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut
}
