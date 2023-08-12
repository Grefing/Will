import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { login } from "../helpers/queriesBack";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "/styles/registroLogin.css";

const Login = ({ setUsuarioLogueado }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navegacion = useNavigate();



  const onSubmit = (usuario) => {
    login(usuario).then((res) => {
      if (res && res.status === 200) {
        console.log(res);
        localStorage.setItem("usuario", JSON.stringify(res));
        setUsuarioLogueado(res);
        reset();
        navegacion("/");
      } else {
        Swal.fire("Error!", "El email o password son incorrectos!", "error");
      }
    });
  };

  return (
    <section className="mt-5 mainSection">
      <div className="row registrationContainer">
        <div className="col-10 col-sm-8 col-md-6 col-xl-3 containerRegistroForm">
          <h3 className="titleRegister">Iniciar sesión</h3>
          <div className="registerLine"></div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-2">
              <Form.Control
                placeholder="Ingrese su email"
                {...register("email", {
                  required: "El email es un dato obligatorio",
                  pattern: {
                    value:
                      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=? ^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a -z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                    message:
                      "El email debe tener el siguiente formato: mail@dominio.com",
                  },
                })}
                className={errors.email ? "input-error" : ""}
              />
              <Form.Text className="text-danger">
                {errors.email?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                type="password"
                placeholder="Ingrese un password"
                {...register("password", {
                  required: "El password es obligatorio",
                  pattern: {
                    value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
                    message:
                      "El password debe tener en 8 y 16 caracteres, al menos un digito, al menos una minúscula y al menos una mayúscula. No puede tener otros simbolos",
                  },
                })}
                className={errors.password ? "input-error" : ""}
              />
              <Form.Text className="text-danger">
                {errors.password?.message}
              </Form.Text>
            </Form.Group>
            <div className="row">
              <Button
                className="btn btn-dark btn-lg btn-block mb-2 btnRegister"
                type="submit"
              >
                Iniciar Sesión
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Login;
