const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => { console.log(`db connected`); }).catch(e => console.log(e))
}

module.exports = connectDatabase