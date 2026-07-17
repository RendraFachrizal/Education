const BaseModel = require('./BaseModel');
const pool = require('../config/database');

class User extends BaseModel {
  static tableName = 'users';

  static async findByEmail(email) {
    const [rows] = await pool.query(
      `SELECT u.*, r.name as role_name 
       FROM users u 
       JOIN roles r ON u.role_id = r.id 
       WHERE u.email = ? LIMIT 1`,
      [email]
    );
    return rows[0] || null;
  }

  static async findAllWithRole({ page = 1, limit = 10, where = '', params = [] } = {}) {
    const countSql = `SELECT COUNT(*) as total FROM users u ${where ? `WHERE ${where}` : ''}`;
    const [countRows] = await pool.query(countSql, params);
    const total = countRows[0].total;

    const offset = (page - 1) * limit;
    const dataSql = `SELECT u.*, r.name as role_name 
                     FROM users u 
                     JOIN roles r ON u.role_id = r.id 
                     ${where ? `WHERE ${where}` : ''} 
                     ORDER BY u.created_at DESC 
                     LIMIT ? OFFSET ?`;
    const [rows] = await pool.query(dataSql, [...params, parseInt(limit), parseInt(offset)]);

    return {
      data: rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}

module.exports = User;
