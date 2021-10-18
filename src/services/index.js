const users = require('./users/users.service.js')
const requests = require('./requests/requests.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users)
  app.configure(requests);
}
