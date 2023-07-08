const express =require("express");
const notes = require("./data/notes");
const dotenv =require('dotenv');
const userRoutes = require('./routes/userRourtes')
const noteRoutes = require('./routes/notesRoutes')

const app = express();
const connecdDB =require('./config/db');
const { errorHandler } = require("./middlewares/errorMIddleware");
dotenv.config();
connecdDB();
app.use(express.json());

app.get('/',(req,res) =>{
      res.send("Api is running");
});

// app.get('/api/notes',(req,res)=>{
// res.send(notes)
// });

app.use('/api/users',userRoutes);
app.use('/api/notes',noteRoutes);

app.use(errorHandler);
const PORT = process.env.PORT || 5000 ;
app.listen(PORT,console.log(`server starrted at port ${PORT}`));
