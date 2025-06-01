//Del archivo models/user.js, se importa el modelo User que fue configurado con Mongoose y actúa de constructor
const User = require("./models/user")
const express = require("express")
const cors = require("cors")
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Se utiliza Express para crear una app que haga de nuestro servidor backend
const app = express()
//Se utiliza el middleware CORS para evitar conflictos con la política del mismo origen
app.use(cors())
//Se utiliza json-parser en la app para una mejor recepción de los datos enviados de las peticiones
app.use(express.json())

//Se crea un endpoint tipo GET para obtener los usuarios de la base de datos
app.get("/api/users", (request, response) => {
  let allUsers = []
  //Se usa el método find del modelo User para encontrar todos los usuarios guardados en la base de datos
  User.find({}).then(result => {
    result.forEach(user => {
      allUsers.push(user)
      
    })
    //Se guardan los usuarios e un array y se envían de vuelta al frontend
    response.json(allUsers)
  })
})

//Se crea un endpoint tipo POST para añadir un usuario a la base de datos
app.post("/api/users", async (request, response) => {
  const body = request.body

  //Con el modelo User se verifica que no exista un usuario con el mismo email proporcionado
  let exists = await User.find({email: body.email})
  //En caso de existir, se cancela el proceso y se devuelve un 208
  if (exists.length > 0) {
      return response.status(208).json({error: "Email already exists"})
    
    }
  
//Se verifica que se hayan proporcionado todos los datos y que la contraseña sea de más de 6 caracteres
  if (body.fullName.trim() == "" || body.email.trim() == "" || body.password.trim() == "") {
    return response.status(400).json({error: "All credentials are required"})

  }

  if (body.password.length < 6) {
    return response.status(400).json({error: "Password's minimun of characters is 6"})

  }

//Utilizando la librería bcrypt, se hashea la contraseña
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(body.password, salt, function(err, hash) {
      //Con la contraseña hasheada, se crea una nueva instancia del model User y se le asignan los datos enviados por el frontend junto a la contraseña hasheada
      const user = new User({
        fullName: body.fullName,
        email: body.email,
        password: hash
      })
      //Se guarda el nuevo usuario en la base de datos
      user.save().then(result => {
        response.json(result)
      })
    })
  })
})

//Se le pide a la app de Express que escuche al puerto 3001 para correr el servidor allí
const PORT = 3001
app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})
