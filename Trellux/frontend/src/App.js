import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Welcome from './components/Welcome/Welcome'
import Navbar from './components/Welcome/Navbar'
import Board from './components/Board/Tasks/Taskboard';
import PageTransition from './components/shared/PageTransition';
import Dashboard from './components/Board/Projects/Projectboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Settings from './components/User/Settings/Settings'

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Welcome /></PageTransition>} />
                <Route path="/board/:projectId" element={<PageTransition><Board /></PageTransition>} />
                <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
                <Route path ="/login" element={<PageTransition><Login /></PageTransition>} />
                <Route path ="/register" element={<PageTransition><Register /></PageTransition>} />
                <Route path ="/settings" element={<PageTransition><Settings /></PageTransition>} />
             </Routes>
        </AnimatePresence>
    );
}

function App() {
    return (
    <Router>
        <div className="App bg-white dark:bg-[#1d1d1f] min-h-screen">
            <Navbar />
            <AnimatedRoutes />
        </div>
    </Router>
    );
}

export default App;
