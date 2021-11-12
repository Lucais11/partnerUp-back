import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import { User } from "./schemas.js/userSchema.js";
import { hashPassword, createJwt } from "./auth.js";

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

//Login route

// app.get('/login', (req, res) => {
//   res.sendFile(__dirname + '/static/login.html');
// });

//Route for post requests

// app.post('/login', (req, res) => {
//   // Insert Login Code Here
//   let username = req.body.username;
//   let password = req.body.password;
//   res.send(`Username: ${username} Password: ${password}`);
// });

app.post("/signup", async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  const user = await User.create({
    username: req.body.username,
    password: hashedPassword,
  });
  const saveToken = createJwt(user._id + "");
  res.json({ token: saveToken });
});

app.post("/signin", async (req, res) => {
  //find user
  const hashedPassword = await hashPassword(req.body.password);
  const user = await User.findOne({
    username: req.body.username,
    password: hashedPassword,
  });
  //  bcrypt.compare(password,savedUser.password)
  //   if(doMatch){
  //     // res.json({message:"successfully signed in"})
  //    const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
  // }
  // else{
  //     return res.status(422).json({error:"Invalid Username or password"})
  // }
  const saveToken = createJwt(user._id + "");
  res.json({ token: saveToken });
});

const CONNECTION_URL =
  "mongodb+srv://partnerUp:Abc123@cluster0.kbb2p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
