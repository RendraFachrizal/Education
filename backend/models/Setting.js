const BaseModel = require('./BaseModel');
const pool = require('../config/database');

class Setting extends BaseModel {
  static tableName = 'settings';

  static async getByKey(key) {
    const [rows] = await pool.query(
      'SELECT * FROM settings WHERE `key` = ? LIMIT 1',
      [key]
    );
    return rows[0] || null;
  }

  static async getGroup(group) {
    const [rows] = await pool.query(
      'SELECT * FROM settings WHERE `group` = ?',
      [group]
    );
    return rows;
  }

  static async getAllAsObject() {
    const [rows] = await pool.query('SELECT `key`, `value` FROM settings');
    const result = {};
    rows.forEach(row => { result[row.key] = row.value; });
    return result;
  }

  static async setValue(key, value) {
    const existing = await this.getByKey(key);
    if (existing) {
      await pool.query('UPDATE settings SET `value` = ? WHERE `key` = ?', [value, key]);
    } else {
      await pool.query('INSERT INTO settings (`key`, `value`) VALUES (?, ?)', [key, value]);
    }
  }
}

module.exports = Setting;
