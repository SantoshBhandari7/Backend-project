import app from "./app"
import { connectDb } from "./config/db.config";

const port =8080;

//*connect database
const DB_URI="mongodb://localhost:27017/firstproject";
connectDb(DB_URI);





app.listen(port ,()=>{
        console.log(`server is running at http://localhost:${port}`);
})