const bcrypt = require('bcryptjs');

module.exports = {
  
  hash(password){
    const salt = bcrypt.genSaltSync(Number(process.env.SALT_GENERATE));
    const hash = bcrypt.hashSync(password, salt);
    return hash
  },

  compare(clientpass, dbpass){
    return bcrypt.compareSync(clientpass, dbpass)
  }
  
  
}
