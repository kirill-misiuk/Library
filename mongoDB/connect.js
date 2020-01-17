const mongoose = require('mongoose');

module.exports = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/library', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .catch((e) => console.log('problem with connection ', e));
};
