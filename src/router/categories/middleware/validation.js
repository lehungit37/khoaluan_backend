const validation = {
  checkData: (req, res, next) => {
    const data = req.body;
    const errors = [];
    for (const key in data) {
      if (!data[key]) {
        errors.push({ messages: `Trường ${data[key]} không được để trống` });
      }
    }
    if (errors.length === 0) {
      next();
    } else {
      return res.status(400).json(errors);
    }
  },
  checkId: (req, res, next) => {
    const { id } = req.params;
    if (id) {
      next();
    } else {
      return res.status(400).json({ messages: "ID không được để trống" });
    }
  }
};

module.exports = validation;
