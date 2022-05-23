const bcrypt = require('bcrypt');
const saltRounds = +process.env.SALT_ROUNDS || 6

const encrypt = (password) => { return bcrypt.hashSync(String(password), saltRounds) };

const comparePwd = (password, encrypted) => bcrypt.compareSync(String(password), encrypted);

module.exports = { encrypt, comparePwd };