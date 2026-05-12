import React, { useEffect } from 'react';
import { CartProvider } from '@/context/CartContext';
import { NotificationProvider } from '@/components/ui/NotificationSystem';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Servicos from './pages/Servicos';
import Aplicativos from './pages/Aplicativos';
import SobreNos from './pages/SobreNos';
import Contacto from './pages/Contacto';
import Portfolio from './pages/Portfolio';
import ClientDashboard from './pages/ClientDashboard';
import Blog from './pages/Blog';
import BlogPostDetail from './pages/BlogPost';
import AdminDashboard from './pages/AdminDashboard';
import ScrollProgressBar from '@/components/ui/ScrollProgressBar';
import StickyCTABar from '@/components/ui/StickyCTABar';
import { useAccessibility, SkipToContent } from '@/hooks/useAccessibility';

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

import { AnimatePresence, motion } from 'framer-motion';

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                        <Home />
                    </motion.div>
                } />
                <Route path="/home" element={
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                        <Home />
                    </motion.div>
                } />
                <Route path="/servicos" element={
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                        <Servicos />
                    </motion.div>
                } />
                <Route path="/aplicativos" element={
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                        <Aplicativos />
                    </motion.div>
                } />
                <Route path="/sobrenos" element={
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                        <SobreNos />
                    </motion.div>
                } />
                <Route path="/contacto" element={
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                        <Contacto />
                    </motion.div>
                } />
                <Route path="/portfolio" element={
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                        <Portfolio />
                    </motion.div>
                } />
                <Route path="/cliente" element={
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                        <ClientDashboard />
                    </motion.div>
                } />
                <Route path="/blog" element={
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                        <Blog />
                    </motion.div>
                } />
                <Route path="/blog/:slug" element={
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                        <BlogPostDetail />
                    </motion.div>
                } />
                <Route path="/admin" element={
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                        <AdminDashboard />
                    </motion.div>
                } />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    // Aplicar melhorias de acessibilidade globalmente
    useAccessibility();

    return (
        <NotificationProvider>
            <CartProvider>
                <Router>
                    <SkipToContent />
                    <ScrollProgressBar />
                    <StickyCTABar />
                    <Layout>
                        <ScrollToTop />
                        <div id="main-content">
                            <AnimatedRoutes />
                        </div>
                    </Layout>
                </Router>
            </CartProvider>
        </NotificationProvider>
    );
}

export default App;
