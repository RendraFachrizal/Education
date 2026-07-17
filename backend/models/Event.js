const BaseModel = require('./BaseModel');
const pool = require('../config/database');

class Event extends BaseModel {
  static tableName = 'events';

  static async getUpcoming(limit = 5) {
    const [rows] = await pool.query(
      `SELECT * FROM events 
       WHERE start_date >= CURDATE() AND status IN ('upcoming', 'ongoing')
       ORDER BY start_date ASC LIMIT ?`,
      [parseInt(limit)]
    );
    return rows;
  }
}

module.exports = Event;
