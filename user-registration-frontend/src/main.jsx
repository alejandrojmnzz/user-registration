import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router"
import App from './App.jsx'
import { Register } from './components/Register.jsx'
//Se crea una desde la que React comienza a mostrar los componentes
createRoot(document.getElementById('root')).render(
    //Con ayuda de la librería React Router, se establece la ruta de entrada y de registro para distintas vistas
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>} />
            <Route path="/register" element={<Register/>} />
        </Routes>

    </BrowserRouter>

)
