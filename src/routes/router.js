const Router = require('express').Router();
const employees =require('../components/employees');

Router.get('/employees',employees.getEmployees);
Router.get('/employees/:id',employees.getEmployeesById);
Router.post('/employees',employees.insertEmployees);
Router.put('/employees/:id',employees.updateEmployeesById);
Router.delete('/employees/:id',employees.deleteEmployeesById);

module.exports = Router;