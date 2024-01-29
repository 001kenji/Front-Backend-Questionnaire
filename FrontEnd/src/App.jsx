import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HashRouter, Routes, Route } from "react-router-dom";
import DashBoard from './JSX/switchBoard';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <HashRouter>
      <Routes>
        <Route path="/" element={<DashBoard />}>
          {/* <Route path="/" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </HashRouter>
    
    </>
  )
}

export default App
