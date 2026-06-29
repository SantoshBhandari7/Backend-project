import app from "./app"

const port =8080;

//*create database



app.listen(port ,()=>{
        console.log(`server is running at http://localhost:${port}`);
})