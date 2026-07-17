const BaseModel = require('./BaseModel');
const pool = require('../config/database');

class Message extends BaseModel {
  static tableName = 'messages';

  static async markAsRead(id, userId) {
    await pool.query(
      'UPDATE messages SET status = ? , read_by = ?, read_at = NOW() WHERE id = ?',
      ['read', userId, id]
    );
  }

  static async countUnread() {
    const [rows] = await pool.query(
      "SELECT COUNT(*) as total FROM messages WHERE status = 'unread'"
    );
    return rows[0].total;
  }
}

module.exports = Message;
