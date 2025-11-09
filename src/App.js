import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Consultants from './pages/Consultants';
import ConsultantRegistration from './pages/ConsultantRegistration';
import CompanyRegistration from './pages/CompanyRegistration';
import ConsultantDashboard from './pages/ConsultantDashboard';
import AboutPage from './pages/AboutPage';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main className="pt-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/consultants" element={<Consultants />} />
          <Route path="/consultant-register" element={<ConsultantRegistration />} />
          <Route path="/consultant/dashboard" element={<ConsultantDashboard />} />
          <Route path="/company/register" element={<CompanyRegistration />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
