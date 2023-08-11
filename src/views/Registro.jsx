import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "/styles/registroLogin.css";
import { registro } from "../helpers/queriesBack";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



const Registro = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navegacion = useNavigate();

  const onSubmit = (usuario) => {
    registro(usuario).then((res) =>{
      if (res && res.status === 201) {
        Swal.fire(
          'Bien hecho!',
          `Bienvenido/a a will, ${usuario.nombreUsuario} `,
          'success'
        )
        navegacion('/login');
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo fué mal!',
        })
      }
    })
  };

  return (
    <section className="mt-5 mainSection">
      <div className="row registrationContainer">
        <div className="col-10 col-sm-8 col-md-6 col-xl-3 containerRegistroForm">
        <h3 className="titleRegister">Registro</h3>
        <div className="registerLine"></div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-2 form">
              <Form.Control
                type="text"
                placeholder="Ingrese un nombre de usuario"
                {...register("nombreUsuario", {
                  required: "El nombre de usuario es un dato obligatorio",
                  minLength: {
                    value: 3,
                    message: "La cantidad mínima de caracteres es 3",
                  },
                  maxLength: {
                    value: 16,
                    message: "La cantidad máxima de caracteres es 16",
                  },
                })}
                className={errors.nombreUsuario ? "input-error" : ""}
              />
              <Form.Text className="text-danger">
                {errors.nombreUsuario?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Control
                placeholder="Ingrese un email"
                {...register("email", {
                  required: "El email es un dato obligatorio",
                  pattern: {
                    value:
                      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=? ^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a -z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                    message:
                      "El email debe tener el siguiente formato: mail@dominio.com",
                  },
                })}
                className={errors.nombreUsuario ? "input-error" : ""}
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
                className={errors.nombreUsuario ? "input-error" : ""}
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
                Registrar
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Registro;
