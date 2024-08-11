import { useState } from 'react'
import './App.css'
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from './pages/MainPage.jsx';
import BoardPage from './pages/BoardPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import WritePage from './pages/WritePage.jsx';
import NavBar from './components/NavBar.jsx';
function App() {

  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/write" element={<WritePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
