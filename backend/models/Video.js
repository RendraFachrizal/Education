const BaseModel = require('./BaseModel');

class Video extends BaseModel {
  static tableName = 'videos';
}

module.exports = Video;
