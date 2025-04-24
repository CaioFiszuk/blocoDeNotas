import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface RegisterProps {
  handleRegistration: (data: { email: string; password: string }) => void;
}

function Register({handleRegistration}: RegisterProps) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      toast.error("Preencha todos os campos!", { autoClose: 3000 });
      return;
    }

    handleRegistration(data);
  };

    return (
    <div className="form__page">
      <form onSubmit={handleSubmit} className="form"  autoComplete="off">
        <legend className="form__title">Cadastre-se</legend>

        <input
          type="email"
          name="email"
          placeholder="E-mail"
          //className="form__input"
          value={data.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Senha"
          //className="form__input"
          value={data.password}
          onChange={handleChange}
        />

        <button className="form__button" type="submit">
          Cadastrar
        </button>

        <span className="form__info">
          Já é um membro? Faça o login{" "}
          <Link to="/signin">
            aqui
          </Link>
        </span>
      </form>

      <ToastContainer />
    </div>
    )
  }
  
  export default Register;