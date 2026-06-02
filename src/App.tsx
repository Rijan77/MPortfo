import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/"               element={<Home />}          />
            <Route path="/about"          element={<About />}         />
            <Route path="/projects"       element={<Projects />}      />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/contact"        element={<Contact />}       />
            <Route path="*"               element={<NotFound />}      />
          </Routes>
        </AnimatePresence>
      </Layout>
    </>
  );
}
