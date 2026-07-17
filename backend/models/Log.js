const BaseModel = require('./BaseModel');
const pool = require('../config/database');

class Log extends BaseModel {
  static tableName = 'logs';

  static async create(data) {
    const { user_id, action, module, record_id, description, ip_address, user_agent } = data;
    const [result] = await pool.query(
      `INSERT INTO logs (user_id, action, module, record_id, description, ip_address, user_agent) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id || null, action, module, record_id || null, description || null, ip_address || null, user_agent || null]
    );
    return { id: result.insertId };
  }

  static async getRecent(limit = 10) {
    const [rows] = await pool.query(
      `SELECT l.*, u.name as user_name 
       FROM logs l 
       LEFT JOIN users u ON l.user_id = u.id 
       ORDER BY l.created_at DESC 
       LIMIT ?`,
      [parseInt(limit)]
    );
    return rows;
  }
}

module.exports = Log;
