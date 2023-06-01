import Form from "../components/common/Form";
import authService from "../services/authService";

function register() {
  const handleRegister = async (data) => {
    console.log(data);
    const response = await authService.signup(data);
    console.log(response);
    console.log(data);
  };
  return (
    <div>
      {" "}
      <Form
        header="Formulario de registro"
        submitLabel="Registrar"
        onSubmit={handleRegister}
        inputs={[
          { name: "name", label: "Nombre de usuario" },
          { name: "password", label: "Contraseña", type: "password" },
        ]}
      />
    </div>
  );
}

export default register;
