const jwt = require("jsonwebtoken");
const connectDatabase = require('../db/Database');
const User = require("../model/user");


exports.userRole = async(req,res,next) => {
    const token = req.headers.authorization.split(" ")[1]; 
    console.dir("Hello");

    if(!token){
        console.log("Hello")
        return next(new ErrorHandler("Please login to continue", 401));
    }
    console.log("Token: ", token); // add this line to log the token value
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    var id = decoded.userId
    try {
        const connection = await connectDatabase();
        const query = "SELECT * FROM users WHERE id = ?";
        const [rows] = await connection.query(query, [id]);
        connection.end();
        
        if (rows.length === 0) {
          console.log('user not found')
          return null; // User not found  
        }

        const user = rows[0];
        console.log(user, 'user role ', user.role)
        return user.role

      } catch (error) {
        throw error;
      }
};
