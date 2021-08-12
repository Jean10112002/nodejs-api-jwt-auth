import mongoose from 'mongoose'
import {config} from '../config/config.js'
mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(()=> console.log("conectada db"))
.catch((err)=>console.log("erorr"+ err));
