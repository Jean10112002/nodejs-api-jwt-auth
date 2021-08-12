import User from "../models/User.model.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import {config} from '../config/config.js'
const schemaRegister = Joi.object({
  name: Joi.string().min(6).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

export const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    await schemaRegister.validate(name, email, password);
  } catch (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  const emailExist = await User.findOne({ email });

  if (emailExist) {
    return res.status(400).json({
      error: "Email ya registrado",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const passwordCrypt = await bcrypt.hash(password, salt);
  const user = new User({
    name,
    email,
    password: passwordCrypt,
  });
  try {
    const savedUser = await user.save();
    res.json({
      error: null,
      data: savedUser,
    });
  } catch (error) {
    console.log("ocurrio error al guardar");
    res.status(400).json({ error });
  }
};

const schemaLogin = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

export const loginController = async(req, res) => {
  try {
    await schemaLogin.validate(req.body.email, req.body.password);
  } catch (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  const user=await User.findOne({email:req.body.email})
  if(!user){
      return res.json({
          error:'usuario no encontrado'
      })
  }

  const validatePassword=await bcrypt.compare(req.body.password,user.password)
  if(!validatePassword){
    return res.status(400).json({ error: 'contraseña no válida' })
  }
  const token=jwt.sign({
      name:user.name,
      id:user._id
  },config.TOKEN_SECRET)
    res.header('auth-token', token).json({
    error: null,
    data: {token}
    })
    res.json({
        error: null,
        data: 'exito bienvenido'
    })

};
