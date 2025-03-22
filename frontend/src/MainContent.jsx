import './App.css';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Crop from './components/models/CropRecommendation';
import Home from './pages/Home';
import About from './pages/About';
import Disease from './components/Disease';
import Fertilizer from './components/models/Fertilizer';
import SoilQuality from './components/models/SoilQuality';
import Footer from './components/Footer';
import GoTop from './components/GoTop';
import NotFound from './NotFound';
import Prices from './components/models/Prices';
import Reports from './components/models/Reports';
import AboutUs from "./components/AboutUs";
import UseScrollToTop from './components/UseScrollToTop';
import Article from './pages/Article';
import TaskReminder from './components/tools/TaskReminder';
import ChatBot from './pages/ChatBot';
import CropRotationRecommendation from './components/models/CropRotationRecommendation';
import DiseaseRecognition from './pages/Disease/DiseaseRecognition';
import SugarcaneRecognition from './pages/Disease/SugarcaneRecognition';
import PaddyRecognition from './pages/Disease/PaddyRecognition';
import Preloader from "./components/PreLoader";
import ProgressScrollDown from "./components/ProgressScrollDown";
import React, { useState, useEffect } from "react";
import Climate from './components/help/Climate';
import Products from "./pages/Products";
import WhyAI from './pages/WhyAI'; // Import the WhyAI component
import TermsAndConditions from './components/TermsAndConditions';
import CookiePolicy from './components/CookiePolicy';
import PlantTaskReminder from './components/tools/PlantTaskReminder';
import MushroomEdibility from './components/models/Mushroom';
import PrivacyPolicy from './components/PrivacyPolicy';
import Licensing from './components/Licensing';
import Feedback from './components/Feedback';
import SoilTestingCentres from './components/SoilTestingCenters';
import WaterManagement from './components/models/WaterManagement';
import BestPractices from './pages/BestPractices';
import SignIn from './components/Signin';



const MainContent = () => {
  UseScrollToTop();
  const location = useLocation(); // Get the current route
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPreloaderVisible(false);
    }, 5000); // Preloader visible for 5 seconds
    return () => clearTimeout(timer);
  }, []);

  const [user, setUser] = useState("");
  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUser(userData);
    }
  }, []);
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("userData"))
  );

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("userData");
    setIsAuthenticated(false); // Update the state
  };

  // Function to handle login (optional for SignIn integration)
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Check if the current path is the one you want to hide the Navbar for
  const normalizePath = (path) => path.toLowerCase().replace(/^\/+|\/+$/g, '');
  const hideNavbarRoutes = ['navigateproducts', '404'];
  const agroShopRoute = 'agroshop';
  const normalizedPath = normalizePath(location.pathname);
  
  return (
    <>
      {isPreloaderVisible ? (
        <Preloader />
      ) : (
        <div>
            <Navbar  />
             {isAuthenticated ? (
              <> 
         
            <GoTop />
            <ProgressScrollDown />
            <div>
               
              <Routes>
                <Route path="/thank-you" element={<Feedback />} /> {/* Thank You Page Route */}
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/licensing" element={<Licensing />} />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/crop" element={<Crop />} />
                <Route path="/water-management" element={<WaterManagement />} />
                <Route path="/fertilizer" element={<Fertilizer />} />
                <Route path="/soil" element={<SoilQuality />} />
                <Route path="/disease" element={<Disease />} />
                <Route path="/crop_recommendation" element={<CropRotationRecommendation />} />
           

                <Route path="/prices" element={<Prices />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/article" element={<Article />} />
                <Route path="/soiltestingcentres" element={<SoilTestingCentres />} />

                <Route path="/TaskReminder" element={<TaskReminder />} />
                
                <Route path="/SugarcaneRecognition" element={<SugarcaneRecognition />} />
                <Route path="/PaddyRecognition" element={<PaddyRecognition />} />
                <Route path="/DiseaseRecognition" element={<DiseaseRecognition />} />
                <Route path="/PlantTaskReminder" element={<PlantTaskReminder />} />
                <Route path="BestPractices" element={<BestPractices/>}/>


                <Route path="/Climate" element={<Climate />} />

                <Route path="/MushroomEdibility" element={<MushroomEdibility />} />
                <Route path="/products" element={<Products />} />
                 
                <Route path="/whyai" element={<WhyAI />} />
                 
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                 <Route path="*" element={<Navigate to="/" />} />
                </Routes>
                </div>
                 
               </>
              ) : (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<SignIn onLogin={handleLogin}/>} />
                <Route path="/thank-you" element={<Feedback />} /> {/* Thank You Page Route */}
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/licensing" element={<Licensing />} />
                <Route path="/products" element={<Products />} />
                <Route path="/about" element={<About />} />
                <Route path="/crop" element={<Crop />} />
                <Route path="/crop_recommendation" element={<CropRotationRecommendation />} />
                <Route path="/prices" element={<Prices />} />

                <Route path="BestPractices" element={<BestPractices/>}/>
                <Route path="/Climate" element={<Climate />} />
                <Route path="/soiltestingcentres" element={<SoilTestingCentres />} />

                <Route path="/TaskReminder" element={<TaskReminder />} />
                <Route path="/PlantTaskReminder" element={<PlantTaskReminder />} />
                <Route path="/water-management" element={<WaterManagement />} />
                 
                <Route path="/whyai" element={<WhyAI />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
              
                <Route path="*" element={<NotFound />}/>
              </Routes>
            )}
                 
              
               
               

 
               <Footer />
             
        
        </div>
      )}
    </>
  );
};

export default MainContent;
