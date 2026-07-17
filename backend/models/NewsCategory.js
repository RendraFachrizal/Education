const BaseModel = require('./BaseModel');

class NewsCategory extends BaseModel {
  static tableName = 'news_categories';
}

module.exports = NewsCategory;
