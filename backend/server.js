const app = require("./app")

const connectDatabase = require("./config/database")
const dotenv = require("dotenv")
dotenv.config({ path: "backend/config/config.env" })

// connectDb

connectDatabase();

app.listen(process.env.PORT, () => { console.log(`app working on the port ${process.env.PORT}`) });
