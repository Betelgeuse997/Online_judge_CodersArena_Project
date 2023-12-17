import React from "react";
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import AddQuestion from './components/Questions/AddQuestion';
import DeleteQuestion from './components/Questions/DeleteQuestion';
import EditQuestion from './components/Questions/EditQuestion';
import ListQuestion from './components/Questions/ListQuestion';
import CodeEditor from "./components/Editor";
import Home from "./components/Home";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoutes from "./privateRoutes/PrivateRoutes";
import DisableGoBackButton from "./components/auth/DisableGoBackButton";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <DisableGoBackButton />
        <Routes>
        <Route path = "/" element={ <PrivateRoutes><Home /></PrivateRoutes> } />
        <Route path = "question/add" element={<PrivateRoutes><AddQuestion /></PrivateRoutes>} />
        <Route path = "question/delete/:id" element={<PrivateRoutes><DeleteQuestion /></PrivateRoutes>} />
        <Route path = "question/edit/:id" element={<PrivateRoutes><EditQuestion /></PrivateRoutes>} />
        <Route path = "question/list/:id" element={<PrivateRoutes><ListQuestion /></PrivateRoutes>} />
        <Route path = "/question/:id" component={CodeEditor} />
        <Route path = "editor/:id" element={<PrivateRoutes><CodeEditor /></PrivateRoutes>} />
        <Route path = "/user/signIn" element={<SignIn />} />
        <Route path = "/user/signUp" element={<SignUp />} />
        </Routes>
        </AuthProvider>
    </Router>
  );
}; 

export default App;
