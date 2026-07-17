const BaseModel = require('./BaseModel');
const pool = require('../config/database');

class News extends BaseModel {
  static tableName = 'news';

  static async findBySlug(slug) {
    const [rows] = await pool.query(
      `SELECT n.*, nc.name as category_name, nc.slug as category_slug
       FROM news n
       LEFT JOIN news_categories nc ON n.category_id = nc.id
       WHERE n.slug = ? LIMIT 1`,
      [slug]
    );
    return rows[0] || null;
  }

  static async findPublished({ page = 1, limit = 9, category = '', search = '' } = {}) {
    let where = "n.status = 'published' AND n.published_at <= NOW()";
    const params = [];

    if (category) {
      where += ' AND nc.slug = ?';
      params.push(category);
    }
    if (search) {
      where += ' AND (n.title LIKE ? OR n.content LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    const countSql = `SELECT COUNT(*) as total FROM news n LEFT JOIN news_categories nc ON n.category_id = nc.id WHERE ${where}`;
    const [countRows] = await pool.query(countSql, params);
    const total = countRows[0].total;

    const offset = (page - 1) * limit;
    const dataSql = `SELECT n.id, n.title, n.slug, n.thumbnail, n.author, n.published_at, n.views,
                            nc.name as category_name, nc.slug as category_slug
                     FROM news n
                     LEFT JOIN news_categories nc ON n.category_id = nc.id
                     WHERE ${where}
                     ORDER BY n.published_at DESC
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

  static async incrementViews(id) {
    await pool.query('UPDATE news SET views = views + 1 WHERE id = ?', [id]);
  }

  static async getRelated(newsId, categoryId, limit = 3) {
    const [rows] = await pool.query(
      `SELECT id, title, slug, thumbnail, published_at 
       FROM news 
       WHERE category_id = ? AND id != ? AND status = 'published'
       ORDER BY published_at DESC 
       LIMIT ?`,
      [categoryId, newsId, parseInt(limit)]
    );
    return rows;
  }
}

module.exports = News;
