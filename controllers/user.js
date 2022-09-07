const { sendResponse } = require("../utils/utils");

module.exports = {
  login: async (req, res) => {
    try {
      const {} = req.body;
      sendResponse(null, req, res, {});
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
};
