const mongoose = require('mongoose');


const dns = require('dns');


const connectDB = async () => {
    dns.setServers(["1.1.1.1", "1.0.0.1"]);

    mongoose.connect('mongodb+srv://anas987x_db_user:aZ7md2KO4pIyko4K@cluster0.o9zzmfy.mongodb.net/?appName=Cluster0')
  .then(() => console.log('Connected!')).catch(err => console.log('DB connection error: ',err));    
}

module.exports = connectDB;