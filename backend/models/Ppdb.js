const BaseModel = require('./BaseModel');
const pool = require('../config/database');

class Ppdb extends BaseModel {
  static tableName = 'ppdb';

  static async findByRegistrationNumber(number) {
    const [rows] = await pool.query(
      'SELECT * FROM ppdb WHERE registration_number = ? LIMIT 1',
      [number]
    );
    return rows[0] || null;
  }

  static async generateRegistrationNumber(year) {
    const prefix = `PPDB/${year}/`;
    const [rows] = await pool.query(
      'SELECT COUNT(*) as total FROM ppdb WHERE registration_number LIKE ?',
      [`${prefix}%`]
    );
    const number = String(rows[0].total + 1).padStart(4, '0');
    return `${prefix}${number}`;
  }

  static async getStats() {
    const [rows] = await pool.query(
      `SELECT status, COUNT(*) as total FROM ppdb GROUP BY status`
    );
    const stats = { total: 0, pending: 0, verified: 0, approved: 0, rejected: 0, waiting_list: 0 };
    rows.forEach(row => {
      stats.total += row.total;
      stats[row.status] = row.total;
    });
    return stats;
  }
}

module.exports = Ppdb;
