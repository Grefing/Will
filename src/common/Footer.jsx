import {
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineGithub,
} from "react-icons/ai";
import "/styles/footer.css"
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 text-center">
      <div>
        <p>&copy; Todos los derechos reservados</p>
      </div>
      <div>
        <Link to={'https://www.instagram.com/tomi_waj/'}><AiOutlineInstagram className="igLogo logo"></AiOutlineInstagram></Link>
        <Link to={'https://www.facebook.com/tomas.wajnerman'}><AiOutlineFacebook className="fcLogo logo"></AiOutlineFacebook></Link>
        <Link to={'https://twitter.com/TomasitoWaj'}><AiOutlineTwitter className="twLogo logo"></AiOutlineTwitter></Link>
        <Link to={'https://github.com/Grefing'}><AiOutlineGithub className="ghLogo logo"></AiOutlineGithub></Link>
      </div>
    </footer>
  );
};

export default Footer;
