import mongoose from "mongoose";



export const connectDatabase = () => {

    mongoose.connect(process.env.DB_URL).then(c => {
        console.log(`Database connected to: ${c.connection.host}`)
    }).catch(e => {
        console.log(e)
    })

}