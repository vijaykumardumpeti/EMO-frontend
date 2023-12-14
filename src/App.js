import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Registration from './components/registration'
import Login from './components/login'
import Home from './components/Home'

const App = ()=>{
    return(
        <>
        <Router>
            <Routes>
                <Route path="/" element={<Registration/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/home" element = {<Home/>} />
            </Routes>
        </Router>
        </>
    )
}



export default App;
