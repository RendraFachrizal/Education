const BaseModel = require('./BaseModel');
const pool = require('../config/database');

class Menu extends BaseModel {
  static tableName = 'menus';

  static async getMenuTree(position = 'header') {
    const [rows] = await pool.query(
      `SELECT * FROM menus 
       WHERE status = 'active' AND (position = ? OR position = 'both') 
       ORDER BY sort_order ASC`,
      [position]
    );

    const buildTree = (items, parentId = null) => {
      return items
        .filter(item => item.parent_id === parentId)
        .map(item => ({
          ...item,
          children: buildTree(items, item.id)
        }));
    };

    return buildTree(rows);
  }
}

module.exports = Menu;
