const mongoose = require("mongoose")

//Se guarda la url de nuestra base de datos en la nube de MongoDB Atlas
const url = "mongodb+srv://alejandro:d0N4o18bP5uM0bBr@cluster0.nw7payd.mongodb.net/userApp?retryWrites=true&w=majority&appName=user-registration"
//Con el middleware Mongoose, configuramos nuestros esquemas y modelos
//Conectamos nuestro middleware Mongoose a nuestra base de datos
mongoose.connect(url)
    .then(result => console.log("conectado a MongoDB"))
    .catch(error => console.log(error))

//Se crea un nuevo esquema de usuario, indicando sus parámetros y tipado
const userSchema = new mongoose.Schema({
fullName: String, 
email: String,
password: String
})

//Se configura el esquema para convertir el id del objeto a un string para estar seguros
userSchema.set('toJSON', {
transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
}
})

//Creamos un nuevo modelo User utilizando el esquema creado, y exportamos solamente el nuevo modelo para que el archivo index.js pueda acceder a él fácilmente
module.exports = mongoose.model('User', userSchema)