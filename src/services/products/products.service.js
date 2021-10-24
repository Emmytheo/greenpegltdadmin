// Initializes the `products` service on path `/products`
const { Products } = require('./products.class');
const hooks = require('./products.hooks');

module.exports = function (app) {
  const options = {
    // paginate: app.get('paginate')
  };
  const products = new Products(options, app);

  products.docs = {
    description: 'A products management endpoint',
    definitions: {
      requests: {
        "type": "object",
        "required": [
          
        ],
        "properties": {
          
          
        }
      },
      "requests list": {
        "type": "object",
        "required": [
          
        ],
        "properties": {
          
          
        }
      }
    },
    idType: "string",
    securities: ['find', 'create', 'get', 'update', 'patch', 'remove'],
  }
  // Initialize our service with any options it requires
  app.use('/products', products);

  // Get our initialized service so that we can register hooks
  const service = app.service('products');

  service.hooks(hooks);
};
