import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Login({handleLogin}) {
  
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      toast.error("Preencha todos os campos!", { autoClose: 3000 });
      return;
    }

    handleLogin(data);
  };

    return (
    <div className="form__page">
      <form onSubmit={handleSubmit} className="form" autoComplete="off">
          <legend className="form__title">Entrar</legend>

          <input 
            type='email' 
            name='email'
            placeholder='E-mail'
            className="form__input sign-input" 
            value={data.email}
            onChange={handleChange}
          />

          <input 
            type='password' 
            name='password'
            placeholder='Senha' 
            className="form__input sign-input" 
            value={data.password}
            onChange={handleChange}
          />

          <button className="form__sign-button" type="submit">Entrar</button>

          <span className="form__info">Ainda não é membro? Inscreva-se <Link to='/signup' className='link'>aqui!</Link></span>
       </form>

       <ToastContainer />
    </div>
    )
  }
  
  export default Login;