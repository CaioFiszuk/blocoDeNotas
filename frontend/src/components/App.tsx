import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from "react-toastify";
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import * as auth from '../utils/auth';

interface handleRegistrationProps {
  email: string,
  password: string
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleRegistration = ({email, password}: handleRegistrationProps) => {
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

  return (
    <div>
     <Routes>
        <Route 
          path='/'
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
               <Header />
               <Main />
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
