# Moniy

An application to manage you expenses

Live Demo: https://monify.jelastic.metropolia.fi/

* Users can: 
  - Sign Up and Login
  - To get the avatar (profile imamge), User need to use a [Gravatar](https://en.gravatar.com/) email
  - Add, Update and Delete expense data
  - View chart or graphical representation of their total expenses
  
  ## Technologies used

* [Reactjs](https://reactjs.org/docs/getting-started.html) 
* [ReduxJS](https://redux.js.org/) 
* [Chart.js](https://www.chartjs.org/) 
* [Nodejs](https://nodejs.org/en/docs/) 
* [MongoDB](https://docs.mongodb.com/) 
* [Mongoose-currency](https://www.npmjs.com/package/mongoose-currency) 
* [PassportJS](http://www.passportjs.org/docs/) 
  


### APIDoc

#### User
* `'/api/users/register' - POST` - Register user
* `'/api/users/login' - POST` - Login user

#### Expenses

* `'/api/expenses' - GET`- Get all expenses for currently logged in user
* `'/api/expenses/:id' - GET` - Get specific expense data
* `'/api/expenses' - POST`- Create new expense data
* `'/api/expenses/:id' - POST`- Update specific expense data
* `'/api/expenses/:id' - DELETE` - Delete specific expense data




## Author

* **Sandip Gautam** - [snpdgautm]




