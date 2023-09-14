import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { set, useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { editarFotoUsuario } from "../helpers/queriesBack";

const VentanaModal = ({ show, setShow, handleClose, usuario, setRender }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (URL) => {
    editarFotoUsuario(usuario.id, URL.fotoPerfil).then(() =>{
        setValue("fotoPerfil", "")
        setShow(false)
        setRender(URL)
    } )
  };

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title id="contained-modal-title-vcenter">
          Cambiar foto de pefil
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex">
            <input
              type="text"
              placeholder="Ingrese la URL de la imagen"
              className="form-control"
              {...register("fotoPerfil", {
                required: "Debe ingresar una URl",
                pattern: {
                  value: /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i,
                  message: "Por favor, ingrese una URL de imagen válida.",
                },
              })}
            />
            <AiOutlineClose className="align-self-center" style={{fontSize: "30px"}} onClick={() => setValue("fotoPerfil", "")}></AiOutlineClose>
          </div>
          <Form.Text className="text-danger">
            {errors.fotoPerfil?.message}
          </Form.Text>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose} variant="danger">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VentanaModal;
