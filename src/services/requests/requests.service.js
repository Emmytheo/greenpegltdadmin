// Initializes the `requests` service on path `/requests`
const { Requests } = require('./requests.class');
const hooks = require('./requests.hooks');

module.exports = function (app) {
  const options = {
    // paginate: app.get('paginate')
  };
  const requests = new Requests(options, app);

  requests.docs = {
    description: 'A request management endpoint',
    definitions: {
      requests: {
        "type": "object",
        "required": [
          
        ],
        "properties": {
          "email": {
            "type": "string",
            "description": "User email"
          },
          "password": {
            "type": "string",
            "description": "User Password"
          },
          
        }
      },
      "requests list": {
        "type": "object",
        "required": [
          
        ],
        "properties": {
          "email": {
            "type": "string",
            "description": "User email"
          },
          "password": {
            "type": "string",
            "description": "User Password"
          },
          
        }
      }
    },
    idType: "string",
    securities: ['find', 'create', 'get', 'update', 'patch', 'remove'],
  }
  // Initialize our service with any options it requires
  app.use('/requests', requests);

  // Get our initialized service so that we can register hooks
  const service = app.service('requests');

  service.hooks(hooks);
};
