import { useNavigate } from "react-router";
import { useState } from "react";
import userServices from "../services/user"

export function Register() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        fullName: "",
        email: "",
        password: ""
    })
    const [message, setMessage] = useState({show: false})
    const [users, setUsers] = useState([])

    function handleChange({target}) {
        //Cuando el cliente ingresa los datos, se asignan a tiempo real al estado user
        setUser({...user, [target.name]: target.value})
    }

    function handleSubmit(event) {
        event.preventDefault()
        //Se verifica que se proporcionaron todos los datos y que la contraseña es mayor a 6 caracteres
        if (user.fullName.trim() == "" || user.email.trim() == "" || user.password.trim() == "") {
            setMessage({success: false, text: "All credentials are required", show: true})
            return
        }
        if (user.password.length < 6) {
            setMessage({success: false, text: "Password's minimum of characters is 6", show: true})
            return
        }
        //Se accede a las funciones del archivo user.js y se llama a la que envía el nuevo usuario al servidor para añadirlo a la base de datos
        userServices
            .postUser(user)
            .then(result => {
                if (result.status == 200) {
                    //Si la respuesta es exitosa, se establece una alerta para indicarlo
                    setMessage({success: true, text: "User registered!", show: true})
                    //2 segundos después se envia al cliente al avista principal
                    setTimeout(() => {
                        navigate("/")
                    }, 2000);
                }
                if (result.status == 208) {
                    setMessage({success: false, text: "User with that email already exists", show: true})
                }
                })
            .catch(error => setMessage({success: false, text: "An error has ocurred", show: true}))
    
        }


    return (
        <>
        <div className="d-flex justify-content-center">
            <form className="w-50" onSubmit={handleSubmit}>
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <input id="fullName" name="fullName" className="form-control" onChange={handleChange}/>
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" name="email" id="email" className="form-control" onChange={handleChange}/>
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" id="password" name="password" className="form-control" onChange={handleChange}/>

                <button className="btn btn-primary mt-2" type="submit">Submit</button>
            </form>

        </div>
        <div className="d-flex justify-content-center">
            {
                //Si en algún momento se establece la propiedad show del estado message como true, se muestra una alerta con el contenido especificado
                message.show &&
                <div className={`w-75 alert alert-${message.success ? "success" : "danger"}`}>{message.text}</div>
            }
        </div>
        </>
    )

}