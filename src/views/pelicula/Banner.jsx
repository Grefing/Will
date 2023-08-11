import Carousel from "react-bootstrap/Carousel";
import { Button } from "react-bootstrap";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "/styles/banner.css";

const Banner = ({ data, type }) => {
  const array = data.slice(0, 9);
  const navegacion = useNavigate();

  const handleBtn = (id) => {
    navegacion(`/detalles/${type}/${id}`);
  };

  return (
    <Carousel className="bannerContainer">
      {array.map((banner) => (
        <Carousel.Item key={banner.id}>
          <img
            className="banner"
            src={`https://image.tmdb.org/t/p/original/${banner.backdrop_path}`}
            alt=""
          />
          <Carousel.Caption className="btnBannerContainer">
            {
              type === "films"? (
                <>
                <h3 className="bannerTitle">{banner.original_title}</h3>
                </>
              ) : (
                <>
                <h3 className="bannerTitle">{banner.original_name}</h3>
                </>
              )
            }
            <Button
              className="btnBanner d-flex"
              onClick={() => handleBtn(banner.id)}
            >
              MAS INFORMACIÓN{" "}
              <AiOutlineInfoCircle className="iconMasInfo"></AiOutlineInfoCircle>
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Banner;
