import mongoose from "mongoose";

export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "RUET_Cyber_Security_Club"
    }).then(()=>{
        console.log("Connected to MongoDB database");
    }).catch((err)=>{
        console.error(`Failed to connect to MongoDB database. Error: ${err}`);
    })
}