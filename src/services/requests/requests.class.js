const { Service } = require('feathers-mongodb');

exports.Requests = class Requests extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('requests');
    });
  }
};
