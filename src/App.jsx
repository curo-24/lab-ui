import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster.jsx';
import { toast } from '@/components/ui/use-toast.js';
import LoginScreen from '@/components/LoginScreen.jsx';
import Dashboard from '@/components/Dashboard.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import TopBar from '@/components/TopBar.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('admin');
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = (role) => {
    setUserRole(role);
    setIsAuthenticated(true);
    toast({
      title: "Welcome to Curo24 Lab!",
      description: `Logged in as ${role}`,
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
    toast({
      title: "Logged out successfully",
      description: "See you next time!",
    });
  };

  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Curo24 Lab - Login</title>
          <meta name="description" content="Secure login to Curo24 Lab Management System" />
        </Helmet>
        <LoginScreen onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Curo24 Lab - Dashboard</title>
        <meta name="description" content="Professional lab management system for efficient healthcare operations" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <Sidebar 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            userRole={userRole}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            isMobile={isMobile}
          />
          
          <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen && !isMobile ? 'lg:ml-64' : 'ml-0'}`}>
            <TopBar 
              userRole={userRole}
              onLogout={handleLogout}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
            
            <main className="p-4 sm:p-6 lg:p-8 bg-gray-50">
              <Dashboard 
                currentPage={currentPage}
                userRole={userRole}
              />
            </main>
          </div>
        </div>
        
        <Toaster />
      </div>
    </>
  );
}

export default App;