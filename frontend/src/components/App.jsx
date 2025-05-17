import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import Header from '../components/Header';
import Main from '../components/Main';
import Register from '../components/Register';
import Login from '../components/Login';
import ProtectedRoute from '../components/ProtectedRoute';
import * as auth from '../utils/auth';
import * as token from '../utils/token';

function App() {

const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
const navigate = useNavigate();

  const handleRegistration = ({email, password}) => {
    auth.register(email, password)
      .then(() => {
        toast.success("Cadastro realizado com sucesso!", {
          position: "top-right",
          autoClose: 3000, 
          onClose: () => navigate("/signin") 
        });
      })
      .catch((error) => {
          toast.error(error.message.substr(6, 29));
      });
  }

  useEffect(()=>{

  }, []);

  return (
    <div>
       <Routes>
         <Route 
           path='/'
           element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
               <Header/>
               <Main/>
            </ProtectedRoute>
           }
         />

         <Route 
           path='/signup'
           element={
            <>
              <Register handleRegistration={handleRegistration}/>
            </>
           }
         />

         <Route 
           path='/signin'
           element={
            <>
              <Login />
            </>
           }
         />

          <Route
            path="*"
            element={
              isLoggedIn ? (
              <Navigate to="/" replace />
              ) : (
              <Navigate to="/signin" replace />
              )
            }
          />
       </Routes>
    </div>
  )
}

export default App;
