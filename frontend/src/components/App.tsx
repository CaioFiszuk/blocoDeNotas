import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Login from './Login';
import Register from './Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
         path='/register'
         element={
          <>
           <Register />
          </>
         }
        />

        <Route 
          path='/login'
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
