import "dotenv/config";
import "./lib/sendgrid";
import * as express from "express";
import * as cors from "cors";
const app = express();
const PORT = process.env.PORT || 3000;
import { auth, lostpets, users } from "./routes";

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/auth", auth);
app.use("/pets", lostpets);
app.use("/users", users);

app.listen(PORT, () => {
	console.log(`listening at http://localhost:${PORT}`);
});
