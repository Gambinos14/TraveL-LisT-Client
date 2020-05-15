'use strict'

const config = require('../config.js')
const store = require('../store.js')

const signUp = credentials => {
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(credentials)
  })
}

const signIn = credentials => {
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(credentials)
  })
}

const changePassword = passwords => {
  return $.ajax({
    url: config.apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    contentType: 'application/json',
    data: JSON.stringify(passwords)
  })
}

const signOut = () => {
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut
}
