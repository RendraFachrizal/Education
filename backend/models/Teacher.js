const BaseModel = require('./BaseModel');

class Teacher extends BaseModel {
  static tableName = 'teachers';
}

module.exports = Teacher;
