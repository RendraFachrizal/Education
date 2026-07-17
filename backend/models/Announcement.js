const BaseModel = require('./BaseModel');

class Announcement extends BaseModel {
  static tableName = 'announcements';
}

module.exports = Announcement;
