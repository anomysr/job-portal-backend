const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const connectDB=require("./config/db");
const { protect } =
require("./middleware/authMiddleware");
dotenv.config();
console.log(process.env.MONGO_URI);
connectDB();

const authroutes=require("./routes/authroutes");
const app=express();
app.use(express.json());
app.use(cors());
app.use("/api/auth",authroutes);
app.get("/",(req,res)=>{
    res.json({
        message:"job portal api running"
    });

});

const User = require("./models/User");

app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.get("/profile", protect, (req, res) => {

    res.json({
        user: req.user
    });

});
const PORT=process.env.PORT||5000;

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});
