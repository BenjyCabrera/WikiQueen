import Form from "../components/common/Form";
import authService from "../services/authService";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

function login() {
  const [user, dispatch] = useAuth();
  const navigate = useNavigate()

  const handleLogin = async (data) => {
    console.log(data);
    const decodedJWT = await authService.login(data);
    dispatch({ type: "LOGIN", payload: decodedJWT });
    navigate(-1)

  };
  return (
    <div>
      {" "}
      <Form
        header="Inicio de sesión"
        submitLabel="Inicio de sesión"
        onSubmit={handleLogin}
        inputs={[
          { name: "name", label: "Nombre de usuario" },
          { name: "password", label: "Contraseña", type: "password" },
        ]}
      />
    </div>
  );
}

export default login;
