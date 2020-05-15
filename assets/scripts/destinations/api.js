'use strict'

const config = require('../config.js')
const store = require('../store.js')

const getList = () => {
  return $.ajax({
    url: config.apiUrl + '/destinations',
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

const addDestination = destination => {
  return $.ajax({
    url: config.apiUrl + '/destinations',
    method: 'POST',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    data: JSON.stringify(destination)
  })
}

const changeRating = (id, rating) => {
  return $.ajax({
    url: config.apiUrl + `/destinations/${id}`,
    method: 'PATCH',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    data: JSON.stringify(rating)
  })
}

const deleteDestination = id => {
  return $.ajax({
    url: config.apiUrl + `/destinations/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

module.exports = {
  getList,
  addDestination,
  changeRating,
  deleteDestination
}
