const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication')
const { LocalStrategy } = require('@feathersjs/authentication-local')
const { expressOauth } = require('@feathersjs/authentication-oauth')

module.exports = app => {
  const authentication = new AuthenticationService(app)

  authentication.register('jwt', new JWTStrategy())
  authentication.register('local', new LocalStrategy())

  authentication.docs = {
    description: 'The Default Authentication Service',
    definitions: {
      authentication: {
        "type": "object",
        "required": [
          'strategy',
          "email",
          "password"
        ],
        
        "properties": {
          "strategy": {
            "type": "string",
            "description": "strategy",
            "default": "local"
          },
          "email": {
            "type": "string",
            "description": "User email",
            "default": "*********@gmail.com"
          },
          "password": {
            "type": "string",
            "description": "User password",
            "default": "********"
          },
          
        }
      }
    }, 
  }

  app.use('/authentication', authentication)
  app.configure(expressOauth())
}
