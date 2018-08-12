const DriversController = require('../controllers/drivers')

module.exports = (app) => {
  app.get('/api', DriversController.gretting)
  
  app.get('/api/drivers', DriversController.index)
  app.post('/api/drivers', DriversController.create)
  app.put('/api/drivers/:id', DriversController.update)
  app.delete('/api/drivers/:id', DriversController.delete)
}