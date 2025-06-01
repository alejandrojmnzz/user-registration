import { useState, useEffect } from 'react'
import userServices from "./services/user"
import { NavLink } from "react-router"

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    //Se accede al archivo user.js ubicado en la carpeta services para obtener tdos los usuarios y guardarlos en un estado
        userServices
            .getUsers()
            .then(result => setUsers(result.data))
    }, [])
  return (
    <>
      <div className='d-flex justify-content-center'>
        <h1>User Registration</h1>
      </div>
      <div className='d-flex justify-content-center'>
        <NavLink className='btn btn-primary' to="/register">Register</NavLink>
      </div>
      <div className='d-flex flex-column align-items-center mt-3'>
        {
          //Se mapea a cada usuario para asignarle un div con su información
          users.map((user, index) => {
            return (
              <div key={index} className='border border-secondary bg-body-secondary rounded p-1 w-50 mt-2'>
                <p className='fs-2'>{user.fullName}</p>
                <p>{user.email}</p>
                <p><strong>Hashed password: </strong>{user.password}</p>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default App
