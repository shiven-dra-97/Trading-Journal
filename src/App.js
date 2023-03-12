import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from "./Components/Header";
import Dashboard  from './Components/Dashboard';
import Statistics from './Components/Statistics';

import './App.css';

const App=()=>(
    <BrowserRouter>
    <Header/>
    <Routes>
        <Route exact path="/" element={<Dashboard/>}/>
        <Route exact path="/statistics" element={<Statistics/>}/>
    </Routes>
    </BrowserRouter>

)


export default App;
