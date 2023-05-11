import * as bearerToken from "bearer-token";
import * as jwt from "jsonwebtoken";

function authMiddleWare(req, res, next) {
	bearerToken(req, (err, token) => {
		if (err) {
			res.status(401).json({ err });
		}
		try {
			const decoded = jwt.verify(token, process.env.SECRET);
			req._user = decoded;
			next();
		} catch (err) {
			res.status(401).json({ err });
		}
	});
}

export { authMiddleWare };
