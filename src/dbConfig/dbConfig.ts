import mongoose from "mongoose";

export async function connect() {

    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('Mongoddb connected succesfully')
        })

        connection.on('error', (error) => {
            console.log("errorr occured: mongoDB connection errr " + error)
        })

    } catch (error) {
        console.log('SOMETHING G is WRONG')
        console.log(error)
    }
}