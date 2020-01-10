const mongoose = require('mongoose');

module.exports = async () => {
  mongoose.connect(`${process.env.MONGO_URL}/${process.env.MONGO_DATABASE}`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .catch((e) => console.log('problem with connection ', e));
};
