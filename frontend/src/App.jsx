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
import LibraryPage from './pages/LibraryPage.jsx';
import EventPage from './pages/EventPage.jsx';
import EventDetailPage from './pages/EventDetailPage.jsx';
import StudyPage from './pages/StudyPage.jsx';
import StudyDetailPage from './pages/StudyDetailPage.jsx';
import RankingPage from './pages/RankingPage.jsx';

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
          <Route path="/event">
            <Route index element={<EventPage />}></Route>
            <Route path=":eventId" element={<EventDetailPage />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/write" element={<WritePage />} />
          <Route path="/view" element={<ViewPage />} >
            <Route path=":view_id" element={<ViewPage />} />
          </Route>
          <Route path='/wiki' element={<WikiPage />}></Route>

          <Route path="/wiki/edit" element={<WikiEditPage />}>
            <Route path="/wiki/edit/:wiki_title" element={<WikiEditPage />} />
          </Route>

          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/intro" element={<WikiPage />} />
          <Route path="/history" element={<WikiPage />} />
          <Route path="/rule" element={<WikiPage />} />
          <Route path="/executive" element={<WikiPage />} />
          <Route path="/homepage" element={<WikiPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/study" element={<StudyPage />} />
          <Route path="/study/:study_id" element={<StudyDetailPage />} />
          <Route path="/study/create" element={<div>스터디 만들기 페이지</div>} />
          <Route path="/ranking" element={<RankingPage />} /> 

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
