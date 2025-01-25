import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Contact from './Components/Contact';
import Projects from './Components/Projects';
import Resume from './Components/Resume';
import PNF from './Components/404';

import Login from './Auth/Login';
import ForgetPassword from './Auth/ForgetPassword';
import ResetPassword from './Auth/ResetPassword';
import Private from './Admin/Private';
import LinkComponent from './Admin/pages/Link';

function App() {
  return (
    <Router>
      {/* <Header /> */}

      <Routes>
        {/* Main Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/resume" element={<Resume />} />

        {/* Private Routes */}
        <Route element={<Private />}>
          <Route path="/link/*" element={<LinkComponent />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/resetPassword/:userId/:token" element={<ResetPassword />} />

        {/* 404 Route */}
        <Route path="*" element={<PNF />} />
      </Routes>
    </Router>
  );
}

export default App;
