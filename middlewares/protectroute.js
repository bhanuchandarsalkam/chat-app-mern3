const jwt=require("jsonwebtoken");
const usermodel = require("../Models/usermodel");
const protectRoute = async (req, res, next) => {
    
	try {
        console.log("hai heelo")
		const token = req.cookies.jwt;
       console.log("hai",token)
		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}
		const decoded = jwt.verify(token, process.env.secret_key);
        console.log(decoded)

		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		const user = await usermodel.findById(decoded.userId).select("password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;

		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports=protectRoute;