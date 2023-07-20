const express = require("express");
const dotenv = require("dotenv")
dotenv.config();
const bodyparser = require("body-parser");
const cors = require("cors");
const client = require("./utils/database");

const routes = require("./routes/routes");

const app = express();

app.use(cors());
app.use(bodyparser.json());

app.use("/routes", routes);

app.get("/", (req, res, next) => {
    res.json({ success : true, msg : "Called Server Successfully!"});
})

client.connect().then(()=>{
    
})
app.listen(4000);
console.log("Server Started @ PORT 4000")





