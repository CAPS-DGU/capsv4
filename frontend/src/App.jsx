import { useState } from 'react'
import './App.css'
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from './pages/MainPage.jsx';
import BoardPage from './pages/BoardPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import WritePage from './pages/WritePage.jsx';
import IntroPage from './pages/IntroPage.jsx';
import ViewPage from './pages/ViewPage.jsx';
import NavBar from './components/NavBar.jsx';
function App() {

  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/board" element={<BoardPage />}>
            <Route path=":board_id" element={<BoardPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/write" element={<WritePage />} />
          <Route path="/view" element={<ViewPage />} >
            <Route path=":view_id" element={<ViewPage />} />
          </Route>
          <Route path="/intro" element={<IntroPage />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
