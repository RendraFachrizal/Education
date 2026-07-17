const success = (res, data = null, message = 'Berhasil', statusCode = 200) => {
  const response = { success: true, message };
  if (data !== null) response.data = data;
  return res.status(statusCode).json(response);
};

const created = (res, data = null, message = 'Data berhasil ditambahkan') => {
  return success(res, data, message, 201);
};

const error = (res, message = 'Terjadi kesalahan', statusCode = 500, errors = []) => {
  const response = { success: false, message };
  if (errors.length > 0) response.errors = errors;
  return res.status(statusCode).json(response);
};

const notFound = (res, message = 'Data tidak ditemukan') => {
  return error(res, message, 404);
};

const badRequest = (res, message = 'Data tidak valid', errors = []) => {
  return error(res, message, 400, errors);
};

const unauthorized = (res, message = 'Tidak memiliki akses') => {
  return error(res, message, 401);
};

const forbidden = (res, message = 'Akses ditolak') => {
  return error(res, message, 403);
};

module.exports = { success, created, error, notFound, badRequest, unauthorized, forbidden };
