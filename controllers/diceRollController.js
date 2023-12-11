const asyncHandler = require('express-async-handler');

const getRoll = asyncHandler(async(req, res) => {
  try {
    res.send(3);
  } catch (error) {
    res.sendStatus(500);
    throw new Error(error.message);
  }
});

module.exports = {
  getRoll
}