const admins = require('../app');

exports.getAdmin = (req, res, next) => {
  res.json({
    message: "Admin fetched successfully!",
    admins
  });
};

exports.createAdmin = (req, res, next) => {
  const name = req.body.name;
  const tempAdmin = {
    id: new Date().toISOString(),
    name: name,
  }
  admins.push(tempAdmin);
  res.status(201).json({
    message: "Admin created successfully!",
    admins: [...admins,tempAdmin],
  });
};
