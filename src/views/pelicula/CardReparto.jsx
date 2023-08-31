import "/styles/cardReparto.css";
import { Col } from "react-bootstrap";

const CardReparto = ({ actor }) => {
  
  return (
    <Col sm={4} md={4} lg={3} xl={2} className="actorsContainer">
      {
        actor.profile_path !== null ? (
          <img
          className="imgReparto"
          src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
          alt="actor Img"
        />
        ) : (  <img
          className="imgNull"
          src={`https://static.vecteezy.com/system/resources/thumbnails/005/544/770/small_2x/profile-icon-design-free-vector.jpg`}
          alt="actor Img"
        />)
      }
      <div className="actorName">
        {`${actor.name} as `}
        <h5 style={{ color: "#ff5e00" }}>{actor.character}</h5>{" "}
      </div>
    </Col>
  );
};

export default CardReparto;
