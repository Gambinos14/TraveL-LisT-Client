# TraveL-LisT-Client

This app allows users to build their own custom destination lists to start
planning their next big travel adventure.

#### Important Links

API repo: [TraveL-LisT-API](https://github.com/Gambinos14/TraveL-LisT-API)

#### Project Planning

As someone who loves to travel I often find myself dreaming of the next big
adventure, so I decided to build an application where a user can dynamically
build a travel list to keep track of the destinations they want to visit. I
wanted the application to have some integration with the google Maps API so
that a user can navigate around the map for additional inspiration. I began by
building the backend which includes authentication and destination routes that
are used to CRUD the destinations. I then decided to create a front-end with
two panels that include the list of destinations and a map that the user can
interact with to find new destinations to add to their list. I wanted the front
end to display the user's destinations in a specific order chosen by the user
themselves. In order to obtain this feature, I had to add some logic to update
the back-end database every time the user added a destination, changed the
ranking of a destination or deleted a destination from the list. I decided to
tackle this by making a series of PATCH requests to the server after any of the
actions specified above so that I could update the ratings and then make a third
call to the API to return the updated user list. I decided to use handlebars to
create custom bootstrap modals to display some information on each destination
when the user clicks on it.

I ran into a few challenges when I was trying to make a series of PATCH
requests to the server to update the database before displaying the results back
to the user. The current solution uses a for loop to add the return promises of
my ajax requests to a promises array and then runs Promise.all by passing it the
promises array before making a new call to the API to retrive the user
destinations and display them for the user.

#### User Stories
* As a user, I want to be able to interact with only my personal bucket list.
* As a user, I would like to be able to create an ordered list of my top bucket
list detinations.
* As a user, I would like that bucket list to be rendered in the same order every
time I log in.
* As a user, I would like to be able to change the order of the destinations in
my bucket list.

#### Technologies Used
* JavaScript
* HTML
* CSS
* jQuery
* AJAX
* Handlebars.js
* Bootstrap
* Google Maps JavaScript API

#### Future Updates
* Allow user to have multiple lists
* Allow user to add comments in the destination pop-up modal

#### Wireframe and ERD

Wireframe and ERD [imgur link](https://imgur.com/TvBtjZ5)
