import { useState } from 'react'
import './App.css'
import './index.css';
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import MainPage from './pages/MainPage.jsx';
import BoardPage from './pages/BoardPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import JoinPage from './pages/JoinPage';
import WritePage from './pages/WritePage.jsx';
import WikiPage from './pages/WikiPage.jsx';
import WikiEditPage from './pages/WikiEditPage.jsx';
import IntroPage from './pages/IntroPage.jsx';
import HistoryPage from './pages/HistoryPage.jsx';
import ExecutivePage from './pages/ExecutivePage.jsx';
import HomepagePage from './pages/HomepagePage.jsx';
import RulePage from './pages/RulePage.jsx';
import WikiHistoryPage from './pages/WikiHistoryPage.jsx';
import ViewPage from './pages/ViewPage.jsx';
import NavBar from './components/NavBar.jsx';
import LibraryPage from './pages/LibraryPage.jsx';
import EventPage from './pages/EventPage.jsx';
import EventDetailPage from './pages/EventDetailPage.jsx';
import EventCreationPage from './pages/EventCreationPage.jsx';
import EventManagerPage from './pages/EventManagerPage.jsx';
import StudyPage from './pages/StudyPage.jsx';
import StudyDetailPage from './pages/StudyDetailPage.jsx';
import RankingPage from './pages/RankingPage.jsx';
import StudyCreatePage from './pages/StudyCreationPage.jsx';
import StudyEditPage from './pages/StudyEditPage.jsx';
import StudyManagerPage from './pages/StudyManagerPage.jsx';
import MyPage from './pages/MyPage.jsx';
import ComingSoon from './pages/ComingSoon.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />

        <Routes >
          {/* <Route path="/" element={<MainPage />} /> */}

          <Route path="/board" element={<BoardPage />}>
            <Route path=":board_id" element={<BoardPage />} />
          </Route>
          <Route path="/event">
            <Route index element={<ComingSoon />}></Route>
          </Route>
          <Route path="/event1">
            <Route index element={<EventPage />}></Route>
          </Route>
          <Route path="/event/:eventId" element={<EventDetailPage />} />
          <Route path="/event/manager/:eventId" element={<EventManagerPage />} />

          <Route path="/event/create" element={<EventCreationPage />} />
          <Route path="/event/edit/:eventId" element={<EventCreationPage flag={true} />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/write" element={<WritePage />} />
          <Route path="/view" element={<ViewPage />} >
            <Route path=":view_id" element={<ViewPage />} />
          </Route>
          <Route path='/wiki' element={<WikiPage />}>
            <Route path="/wiki/:wiki_title" element={<WikiPage />} />
          </Route>
          <Route path="/wiki/history" element={<WikiHistoryPage />} >
            <Route path="/wiki/history/:wiki_title" element={<WikiHistoryPage />} />
          </Route>
          <Route path="/wiki/edit" element={<WikiEditPage />}>
            <Route path="/wiki/edit/:wiki_title" element={<WikiEditPage />} />
          </Route>

          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/intro" element={<IntroPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/rule" element={<RulePage />} />
          <Route path="/executive" element={<ExecutivePage />} />
          <Route path="/homepage" element={<HomepagePage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/study" element={<StudyPage />} />
          <Route path="/study/:study_id" element={<StudyDetailPage />} />
          <Route path="/study/edit/:study_id" element={<StudyEditPage />} />
          <Route path="/study/manager/:study_id" element={<StudyManagerPage />} />
          <Route path="/study/create" element={<StudyCreatePage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path='*' element={<ComingSoon />} />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
