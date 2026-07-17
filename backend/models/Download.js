const BaseModel = require('./BaseModel');
const pool = require('../config/database');

class Download extends BaseModel {
  static tableName = 'downloads';

  static async incrementCount(id) {
    await pool.query('UPDATE downloads SET download_count = download_count + 1 WHERE id = ?', [id]);
  }
}

module.exports = Download;
