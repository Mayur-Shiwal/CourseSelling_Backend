const express = require("express");
const bodyParse = require("body-parser");

const app = express();
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

app.use(bodyParse.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT: ${PORT}`);
})