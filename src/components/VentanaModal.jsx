import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { editarFotoUsuario } from "../helpers/queriesBack";


const VentanaModal = ({ show, setShow, handleClose, usuario, setRender }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // const [selectedImage, setSelectedImage] = useState("");

  const onSubmit = (URL) => {
    // if (selectedImage !== '') {
    //   editarFotoUsuario(usuario.id, selectedImage).then(() => {
    //     setValue("fotoPerfil", "");
    //     setShow(false);
    //     setRender(selectedImage);
    //   });
    // }
    editarFotoUsuario(usuario.id, URL.fotoPerfil).then(() => {
      setValue("fotoPerfil", "");
      setShow(false);
      setRender(URL);
    });
  };

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header onClick={handleClose} className="d-flex flex-column">
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="align-self-start"
        >
          Cambiar foto de pefil
        </Modal.Title>

        <div className="modalLine align-self-start"></div>
      </Modal.Header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <div className="d-flex">
            <input
              type="text"
              placeholder="Ingrese la URL de la imagen"
              className={errors.fotoPerfil ? "input-error form-control" : "form-control"}
              {...register("fotoPerfil", {
                required: "Debe ingresar una URL",
                pattern: {
                  value: /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i,
                  message: "Por favor, ingrese una URL de imagen válida.",
                },
              })}
            />


            {/*         
            <input
              type="file"
              className="form-control"
              accept=".gif, .jpg, .jpeg, .png, .webp, .bmp"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const imageUrl = URL.createObjectURL(file);
                  setSelectedImage(imageUrl);
                }
              }}
            />
       */}
          </div>
          <Form.Text className="text-danger">
            {errors.fotoPerfil?.message}
          </Form.Text>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" className="saveBtn">
            Guardar
          </Button>
          <Button onClick={handleClose} variant="danger">
            Cerrar
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default VentanaModal;
