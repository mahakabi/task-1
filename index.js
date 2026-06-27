const express = require('express')

const app = express();
const User = require('./modules/User.js');

const connectDB = require('./db.js');
connectDB();

app.use(express.json());


//for creating a new user
app.post('/users', async (req, res) => {
  try {

    const user = req.body;

    await User.create(user);
    res.status(201).json(" User created successfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


//for getting all users
app.get('/users', async (req, res) => {
  
    try {
        const users = await User.find();    
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "the Error is: " + error.message });
    }
});

//for getting a user by id
app.get('/users/:id', async (req, res) => {
  
    try {
        const {id} = req.params;
        console.log(id)
        const users = await User.findById(id);    
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "the Error is: " + error.message });
    }
});


//for updating a user by id
app.put('/users/:id', async (req, res) => {
    try{
        const id = req.params.id
        const users = await User.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json("User updated successfully")

    }catch(err){
        res.status(400).json({msg:"Error : " + err.message})
    }

})

//for deleting a user by id
app.delete('/users/:id', async (req, res) => {
    try{

        const id = req.params.id
        const user = await User.findByIdAndDelete(id);
        res.status(200).json("User deleted successfully")
    }catch(err){

        res.status(400).json({msg:"Error : " + err.message});
    }
});



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

console.log("HI")