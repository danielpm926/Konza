const HTTP_STATUS = require("http-status-codes");

const Model = require("./model");
const { paginationParseParams } = require("./../../../utils");

exports.id = (req, res, next, id) => {
  Model.findById(id, (err, doc) => {
    if (err) {
      next(err);
    } else if (doc) {
      req.doc = doc;
      next();
    } else {
      next({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: "Resource not found",
      });
    }
  });
};

exports.create = (req, res, next) => {
  const { body = {} } = req;

  Model.create(body, (err, doc) => {
    if (err) {
      next(err);
    } else {
      res.status(HTTP_STATUS.CREATED);
      res.json({
        data: doc,
        success: true,
        statusCode: HTTP_STATUS.CREATED,
      });
    }
  });
};

exports.all = (req, res, next) => {
  const { query } = req;
  const { limit, page, skip } = paginationParseParams(query);
  const { sortBy = "createdAt", direction = "desc" } = query;
  const sort = {};
  (sort[sortBy] = direction),
    Model.find({})
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec((err, docs) => {
        if (err) {
          next(err);
        } else {
          res.json({
            data: docs,
            success: true,
            statusCode: HTTP_STATUS.OK,
            meta: {
              limit,
              skip,
              page,
            },
          });
        }
      });
};

exports.read = (req, res, next) => {
  const { doc = {} } = req;
  res.json({
    data: doc,
    success: true,
    statusCode: HTTP_STATUS.OK,
  });
};

exports.update = (req, res, next) => {
  const { body = {}, doc = {} } = req;
  Object.assign(doc, body);

  doc.save((err, document) => {
    if (err) {
      next(err);
    } else {
      res.json({
        data: document,
        success: true,
        statusCode: HTTP_STATUS.OK,
      });
    }
  });
};

exports.delete = (req, res, next) => {
  const { doc = {} } = req;
  doc.remove((err, document) => {
    if (err) {
      next(err);
    } else {
      res.json({
        data: document,
        success: true,
        statusCode: HTTP_STATUS.OK,
      });
    }
  });
};
