import "dotenv/config";
import app from "./app"
import { connectDb } from "./config/db.config";
import ENV_CONFIG from "./config/env.config";
import { verifySMTPconnection } from "./config/nodemailer.config";

const port= ENV_CONFIG.port;

//*connect database
const DB_URI= ENV_CONFIG.db_uri;
connectDb(DB_URI);



app.listen(port , async()=>{
        console.log(`server is running at http://localhost:${port}`);
        await verifySMTPconnection();
})