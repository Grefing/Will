import {
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineGithub,
} from "react-icons/ai";
import "/styles/footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 text-center">
      <div className="footerContainer">
        <div className="align-self-center">
          <Link to={'/'}><img src="/src/assets/logo.png" className="logo" alt="" /></Link>
        </div>

    
          <div className="align-self-center">
            <p className="nameFooter">&copy;Tomas Wajnerman</p>
          </div>

          <div className="align-self-center">
            <Link target="_blank" to={"https://www.instagram.com/tomi_waj/"}>
              <AiOutlineInstagram className="igLogo logo"></AiOutlineInstagram>
            </Link>
            <Link target="_blank" to={"https://www.facebook.com/tomas.wajnerman"}>
              <AiOutlineFacebook className="fcLogo logo"></AiOutlineFacebook>
            </Link>
            <Link target="_blank" to={"https://twitter.com/TomasitoWaj"}>
              <AiOutlineTwitter className="twLogo logo"></AiOutlineTwitter>
            </Link>
            <Link target="_blank" to={"https://github.com/Grefing"}>
              <AiOutlineGithub className="ghLogo logo"></AiOutlineGithub>
            </Link>
          </div>
        </div>
     
    </footer>
  );
};

export default Footer;
