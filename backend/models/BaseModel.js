const pool = require('../config/database');

class BaseModel {
  static tableName = '';

  static async findMany({ select = '*', where = '', params = [], orderBy = '', limit = '', offset = '' } = {}) {
    let sql = `SELECT ${select} FROM ${this.tableName}`;
    const queryParams = [...params];

    if (where) {
      sql += ` WHERE ${where}`;
    }
    if (orderBy) {
      sql += ` ORDER BY ${orderBy}`;
    }
    if (limit) {
      sql += ` LIMIT ?`;
      queryParams.push(parseInt(limit));
    }
    if (offset) {
      sql += ` OFFSET ?`;
      queryParams.push(parseInt(offset));
    }

    const [rows] = await pool.query(sql, queryParams);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(
      `SELECT * FROM ${this.tableName} WHERE id = ? LIMIT 1`,
      [id]
    );
    return rows[0] || null;
  }

  static async findOne(where, params = []) {
    const [rows] = await pool.query(
      `SELECT * FROM ${this.tableName} WHERE ${where} LIMIT 1`,
      params
    );
    return rows[0] || null;
  }

  static async create(data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');

    const [result] = await pool.query(
      `INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES (${placeholders})`,
      values
    );

    return { id: result.insertId, ...data };
  }

  static async update(id, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const setClause = keys.map(key => `${key} = ?`).join(', ');

    const [result] = await pool.query(
      `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`,
      [...values, id]
    );

    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await pool.query(
      `DELETE FROM ${this.tableName} WHERE id = ?`,
      [id]
    );
    return result.affectedRows > 0;
  }

  static async count(where = '', params = []) {
    let sql = `SELECT COUNT(*) as total FROM ${this.tableName}`;
    if (where) {
      sql += ` WHERE ${where}`;
    }
    const [rows] = await pool.query(sql, params);
    return rows[0].total;
  }

  static async paginate({ page = 1, limit = 10, where = '', params = [], orderBy = 'created_at DESC' } = {}) {
    page = Math.max(1, parseInt(page));
    limit = Math.max(1, parseInt(limit));
    const offset = (page - 1) * limit;

    const total = await this.count(where, params);
    const data = await this.findMany({
      where,
      params,
      orderBy,
      limit,
      offset
    });

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    };
  }
}

module.exports = BaseModel;
