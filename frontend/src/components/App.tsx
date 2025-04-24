import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import * as auth from '../utils/auth';
import * as token from '../utils/token';
import { api } from '../utils/api';

interface handleRegistrationProps {
  email: string,
  password: string
}

interface handleLoginProps {
  email: string,
  password: string
}

interface Note {
  _id: string;
  title: string;
  content: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

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

  const handleLogin = ({ email, password }: handleLoginProps) => {
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

  const getAllNotes = async () => {
    await api.getNotes()
    .then((data)=>{
     setNotes(data);
    })
    .catch((error) => console.error("Erro ao buscar as notas:", error));
  }

  const signOut = () => {
    token.removeToken();
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/signin");
  }

  useEffect(() => {
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

    getAllNotes();
  }, []);  

  return (
    <div>
     <Routes>
        <Route 
          path='/'
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
               <Header handleSignOut={signOut}/>
               <Main notes={notes}/>
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
