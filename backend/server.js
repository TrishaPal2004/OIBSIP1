const express = require("express");
const dotenv = require("dotenv");
// const { chats } = require("./data/data");
const cors = require('cors');
const connectDB = require("./components/db.js");
// const userRoutes = require("./routes/userRoutes.js")
// const {notFound,errorHandler}= require("./middlewares/errorMiddleware.js")
const {registerUser, authUser}=require('./Controller/userController.js')
dotenv.config();

connectDB();
const app = express();
app.use(cors())
app.use(express.json());
app.get("/", (req, res) => {
    res.send("API is running successfully");
});

app.post('/', async (req, res) => {
  try {
      const userData = req.body; // Assuming your request body contains user data
      // Call registerUser function and pass userData
      console.log("Hello")
       registerUser(req,res);
      // res.send('Signup successful');
  } catch (error) {
      console.error(error);
      res.status(500).send('Error signing up'); // Handle error response
  }
});

app.post('/login',authUser)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
