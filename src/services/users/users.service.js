// Initializes the `users` service on path `/users`
const { Users } = require('./users.class')
const hooks = require('./users.hooks')


module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  }

  const users = new Users(options, app);
  // Initialize our service with any options it requires
  users.docs = {
    //overwrite things here.
    //if we want to add a mongoose style $search hook to find, we can write this:
    description: 'A service for user management',
    definitions: {
      users: {
        "type": "object",
        "required": [
          "email",
          "password"
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
          "createdAt": {
            "type": "string",
            "description": "object creation date"
          },
          "updatedAt": {
            "type": "string",
            "description": "Last time the object was updated"
          }
        }
      },
      user: {
        "type": "object",
        "required": [
          "email",
          "password"
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
          "createdAt": {
            "type": "string",
            "description": "object creation date"
          },
          "updatedAt": {
            "type": "string",
            "description": "Last time the object was updated"
          }
        }
      }
    },
    multi: 'all',
    operations: {
      find: {
        'parameters[]': {
          description: 'Property to query results',
          in: 'query',
          name: '$search',
          type: 'string'
        },
      },
      retrieve: {
        'parameters[]': {
          description: 'Property to query results',
          in: 'query',
          name: '$search',
          type: 'string'
        },
      }
    },
    idType: "string",
    securities: ['find', 'create', 'get', 'update', 'patch', 'remove'],
    //if we want to add the mongoose model to the 'definitions' so it is a named model in the swagger ui:
    // definitions: {
    //   event: mongooseToJsonLibraryYouImport(Model), //import your own library, use the 'Model' object in this file.
    //   'event_list': { //this library currently configures the return documentation to look for ``${tag} list`
    //      type: 'array',
    //      items: { $ref: '#/definitions/event' }
    //    }
    //  }
  };

  app.use('/users', users)

  // Get our initialized service so that we can register hooks
  const service = app.service('users')

  service.hooks(hooks)
}
