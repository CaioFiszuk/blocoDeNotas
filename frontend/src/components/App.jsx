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

    const handleLogin = ({ email, password }) => {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          token.setToken(data.token);
          localStorage.setItem("isLoggedIn", "true");

          auth.getUserInfo(data.token)
          .then(() => {
            setIsLoggedIn(true);
            navigate("/");
          });
        }
      })
      .catch((error) => {
        toast.error(error.message.slice(6));
      });
  }

  const signOut = () => {
    token.removeToken();
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/signin");
  }

  useEffect(()=>{
    const jwt = token.getToken();
    if (jwt) {
      auth.getUserInfo(jwt)
        .then(() => {
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "true");
        })
        .catch(() => {
          setIsLoggedIn(false);
          token.removeToken();
          localStorage.removeItem("isLoggedIn");
        });
    }
  }, []);

  return (
    <div>
       <Routes>
         <Route 
           path='/'
           element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
               <Header handleSignOut={signOut}/>
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
              <Login handleLogin={handleLogin}/>
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
