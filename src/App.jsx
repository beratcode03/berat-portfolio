import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import ProjectsPage from './components/Projects/ProjectsPage'; 
import ProjectDetail from './components/Projects/ProjectDetail';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetail />} /> {}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;