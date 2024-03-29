import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './Pages/Index/App';
import Signup from './Pages/Signup/signup';
import Login from './Pages/Login/login';
import UserProfileCompletion from './components/Profile/profile';
import DisplayProfile from './components/Displayprofile/displayprofile';
import Step1 from './components/Profile/step1';
import Step2 from './components/Profile/step2';
import Step3 from './components/Profile/step3';
import Step4 from './components/Profile/step4';
import Step5 from './components/Profile/step5';
import Step6 from './components/Profile/step6';
import EditProfile from './components/EditProfile/editprofile';
import Logout from './Pages/Logout/logout';
import Success from './success';
import UserPosts from './components/Posts/posts';
import DisplayPosts from './components/Displayposts/displayposts';
import Home from './Pages/Home/home';

import TryLogin from './Pages/Login/trylogin';
import TrySignUp from './Pages/Signup/trysignup';
import TryStep1 from './components/Profile/tryprofile';
import TryStep2 from './components/Profile/trystep2';
import TryStep3 from './components/Profile/trystep3';
import TryStep4 from './components/Profile/trystep4';
import TryStep5 from './components/Profile/trystep5';
import TryUserProfileCompletion from './components/Profile/tryprofile';


const Paths = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<UserProfileCompletion/>} />
        <Route path="/displayprofile/:userId" element={<DisplayProfile />} />
        <Route path="/displayposts/:userId" element={<DisplayPosts />} />
        <Route path="/displayprofile" element={<DisplayProfile />} />
        <Route path="/step1" element={<Step1/>} />
        <Route path="/step2" element={<Step2/>} />
        <Route path="/step3" element={<Step3/>} />
        <Route path="/step4" element={<Step4/>} />
        <Route path="/step5" element={<Step5/>} />
        <Route path="/step6" element={<Step6/>} />
        <Route path="/editprofile" element={<EditProfile/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/success" element={<Success/>} />
        <Route path="/posts" element={<UserPosts/>} />
        <Route path="/displayposts" element={<DisplayPosts/>} />
        <Route path="/home" element={<Home/>} />

        <Route path="/trylogin" element={<TryLogin/>} />
        <Route path="/trysignup" element={<TrySignUp/>} />
        <Route path="/tryprofile" element={<TryStep1/>} />
        <Route path="/trystep2" element={<TryStep2/>} />
        <Route path="/trystep3" element={<TryStep3/>} />
        <Route path="/trystep4" element={<TryStep4/>} />
        <Route path="/trystep5" element={<TryStep5/>} />
        <Route path="/tryprofile" element={<TryUserProfileCompletion/>} />

      </Routes>
    </Router>
  );
};

export default Paths;