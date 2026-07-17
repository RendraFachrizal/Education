const response = require('../utils/response');
const Log = require('../models/Log');

function createCrudController(Model, moduleName) {
  const index = async (req, res, next) => {
    try {
      const { page = 1, limit = 10, ...filters } = req.query;
      const where = [];
      const params = [];

      Object.entries(filters).forEach(([key, value]) => {
        if (key !== 'page' && key !== 'limit' && value) {
          where.push(`${key} = ?`);
          params.push(value);
        }
      });

      const result = await Model.paginate({
        page: parseInt(page),
        limit: parseInt(limit),
        where: where.join(' AND '),
        params
      });

      return response.success(res, result);
    } catch (error) {
      next(error);
    }
  };

  const show = async (req, res, next) => {
    try {
      const data = await Model.findById(req.params.id);
      if (!data) {
        return response.notFound(res, `${moduleName} tidak ditemukan`);
      }
      return response.success(res, data);
    } catch (error) {
      next(error);
    }
  };

  const store = async (req, res, next) => {
    try {
      const data = await Model.create(req.body);
      await Log.create({
        user_id: req.user?.id,
        action: 'create',
        module: moduleName,
        record_id: data.id,
        description: `Menambahkan ${moduleName}`,
        ip_address: req.ip,
        user_agent: req.headers['user-agent']
      });
      return response.created(res, data, `${moduleName} berhasil ditambahkan`);
    } catch (error) {
      next(error);
    }
  };

  const update = async (req, res, next) => {
    try {
      const existing = await Model.findById(req.params.id);
      if (!existing) {
        return response.notFound(res, `${moduleName} tidak ditemukan`);
      }

      await Model.update(req.params.id, req.body);
      const updated = await Model.findById(req.params.id);

      await Log.create({
        user_id: req.user?.id,
        action: 'update',
        module: moduleName,
        record_id: parseInt(req.params.id),
        description: `Mengupdate ${moduleName}`,
        ip_address: req.ip,
        user_agent: req.headers['user-agent']
      });

      return response.success(res, updated, `${moduleName} berhasil diupdate`);
    } catch (error) {
      next(error);
    }
  };

  const destroy = async (req, res, next) => {
    try {
      const existing = await Model.findById(req.params.id);
      if (!existing) {
        return response.notFound(res, `${moduleName} tidak ditemukan`);
      }

      await Model.delete(req.params.id);

      await Log.create({
        user_id: req.user?.id,
        action: 'delete',
        module: moduleName,
        record_id: parseInt(req.params.id),
        description: `Menghapus ${moduleName}`,
        ip_address: req.ip,
        user_agent: req.headers['user-agent']
      });

      return response.success(res, null, `${moduleName} berhasil dihapus`);
    } catch (error) {
      next(error);
    }
  };

  return { index, show, store, update, destroy };
}

module.exports = createCrudController;
