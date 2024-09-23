import "./App.css";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage.jsx";
import BoardPage from "./pages/BoardPage.jsx";
import ViewPage from "./pages/ViewPage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import JoinPage from "./pages/JoinPage";
import WritePage from "./pages/WritePage.jsx";
import WikiPage from "./pages/WikiPage.jsx";
import WikiEditPage from "./pages/WikiEditPage.jsx";
import WikiHistoryPage from "./pages/WikiHistoryPage.jsx";
import NavBar from "./components/NavBar.jsx";
import LibraryPage from "./pages/LibraryPage.jsx";
import EventPage from "./pages/EventPage.jsx";
import EventDetailPage from "./pages/EventDetailPage.jsx";
import StudyPage from "./pages/StudyPage.jsx";
import StudyDetailPage from "./pages/StudyDetailPage.jsx";
import RankingPage from "./pages/RankingPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {/* 기본 홈 페이지 */}
        <Route path="/" element={<MainPage />} />

        {/* Forum 경로 */}
        <Route path="/board" element={<BoardPage />} />
        <Route path="/board/:boardId" element={<ViewPage />} /> /* 게시물 조회 페이지 */
      

        {/* 기본 전체 게시판 */}
        <Route path="/event">
          <Route index element={<EventPage />}></Route>
          <Route path=":eventId" element={<EventDetailPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/write" element={<WritePage />} />
        
        <Route path="/wiki" element={<WikiPage />}>
          <Route path="/wiki/:wiki_title" element={<WikiPage />} />
        </Route>
        <Route path="/wiki/history" element={<WikiHistoryPage />}>
          <Route
            path="/wiki/history/:wiki_title"
            element={<WikiHistoryPage />}
          />
        </Route>
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
  );
}

export default App;
