const BaseModel = require('./BaseModel');
const pool = require('../config/database');

class Contact extends BaseModel {
  static tableName = 'contacts';

  static async getFirst() {
    const [rows] = await pool.query(`SELECT * FROM contacts LIMIT 1`);
    return rows[0] || null;
  }

  static async updateOrCreate(data) {
    const existing = await this.getFirst();
    if (existing) {
      await this.update(existing.id, data);
      return { id: existing.id, ...data };
    }
    return this.create(data);
  }
}

module.exports = Contact;
