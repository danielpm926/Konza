const tasks = [];
const uuidv4 = require("uuid/v4");

exports.create = (req, res, next) => {
  const { body = {} } = req;
  const title = body.title;
  const description = body.description;
  const uu_id = uuidv4();
  const creationDate = new Date();
  const task = {
    title,
    description,
    id: uu_id,
    creationDate,
  };
  tasks.push(task.title);
  tasks.push(task.description);
  tasks.push(task.id);
  tasks.push(task.creationDate);
  res.json(tasks);
};

exports.all = (req, res, next) => {
  res.json(tasks);
};

exports.read = (req, res, next) => {
  const { params = {} } = req;
  const { id = 1 } = params;
  for (let i = 0; i < tasks.length; i++) {
    if (id == tasks[i].id) {
      console.log(tasks[i].title);
    }
  }
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
