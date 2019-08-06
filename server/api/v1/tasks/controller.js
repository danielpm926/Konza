const tasks = [];
const uuidv4 = require("uuid/v4");

exports.create = (req, res, next) => {
  const { body = {} } = req;
};

exports.all = (req, res, next) => {
  res.json(tasks);
};

exports.read = (req, res, next) => {
  const { params = {} } = req;
  const { id = 1 } = params;
  res.json({
    id,
  });
};

exports.update = (req, res, next) => {
  const { params = {}, body = {} } = req;
  const { id = 1 } = params;

  res.json({
    id,
    ...body,
  });
};

exports.delete = (req, res, next) => {
  const { params = {} } = req;
  const { id = 1 } = params;
  res.json({
    id,
  });
};
