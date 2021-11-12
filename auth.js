import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const secret = "cookiemonster";

export const hashPassword = (password) => {
  return bcrypt.hash(password, 12);
};

// router.post('/signup',(req,res)=>{
//   const {username, password} = req.body
//   if(!password || !username){
//      return res.status(422).json({error:"please add all the fields"})
//   }

// bcrypt.hash(password, 12)
//       .then(hashedpassword=>{
//             const user = new User({
//                password
//                 username
//             })
//
//

// user.save()
// .then(user=>{
//     res.json({message:"saved successfully"})
// })
// .catch(err=>{
//     console.log(err)
// })

const protect = (req, res, next) => {
  try {
    const token = req.header.authorization;
    const user = checkJwt(token);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    res.end();
  }
};

export const createJwt = (id) => {
  var token = jwt.sign({ id }, secret);
  return token;
};

const checkJwt = (token) => {
  var decoded = jwt.verify(token, secret);
  return decoded;
};
