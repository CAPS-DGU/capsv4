import { useState } from 'react'
import './App.css'
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from './pages/MainPage.jsx';
import BoardPage from './pages/BoardPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import JoinPage from './pages/JoinPage';
import WritePage from './pages/WritePage.jsx';
import WikiPage from './pages/WikiPage.jsx';
import WikiEditPage from './pages/WikiEditPage.jsx';
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
          <Route path="/join" element={<JoinPage />} />
          <Route path="/write" element={<WritePage />} />
          <Route path="/view" element={<ViewPage />} >
            <Route path=":view_id" element={<ViewPage />} />
          </Route>
          <Route path='/wiki' element={<WikiPage />}></Route>
          {/* <Route path="/wiki" element={<WikiPage />}>
            <Route path="/wiki/:wiki_title" element={<WikiPage />} /> */}

          {/* // </Route> */}
          <Route path="/wiki/edit" element={<WikiEditPage />}>
            <Route path="/wiki/edit/:wiki_title" element={<WikiEditPage />} />
          </Route>

          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/intro" element={<WikiPage />} />

        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App
