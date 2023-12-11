const asyncHandler = require('express-async-handler');
let rolled = 0;

const getRoll = asyncHandler(async(req, res) => {
  try {
    res.send({roll: rolled});
  } catch (error) {
    res.sendStatus(500);
    throw new Error(error.message);
  }
});

const saveRoll = asyncHandler(async(req, res) => {
  try {
    const value = req.body.value;
    rolled = value;
    res.send({roll: rolled});
  } catch (error) {
    res.sendStatus(500);
    throw new Error(error.message);
  }
});

module.exports = {
  getRoll,
  saveRoll
}