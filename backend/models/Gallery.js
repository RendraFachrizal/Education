const BaseModel = require('./BaseModel');
const pool = require('../config/database');

class Gallery extends BaseModel {
  static tableName = 'galleries';

  static async findWithCoverImage() {
    const [rows] = await pool.query(
      `SELECT g.*, 
              (SELECT gi.image FROM gallery_images gi WHERE gi.gallery_id = g.id ORDER BY gi.sort_order ASC LIMIT 1) as cover_image
       FROM galleries g
       WHERE g.status = 'active'
       ORDER BY g.created_at DESC`
    );
    return rows;
  }

  static async findByIdWithImages(id) {
    const [galleries] = await pool.query(
      `SELECT * FROM galleries WHERE id = ? LIMIT 1`,
      [id]
    );
    if (galleries.length === 0) return null;

    const [images] = await pool.query(
      `SELECT * FROM gallery_images WHERE gallery_id = ? ORDER BY sort_order ASC`,
      [id]
    );

    return { ...galleries[0], images };
  }
}

module.exports = Gallery;
