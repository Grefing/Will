import { Link } from 'react-router-dom';
import error from '../assets/error404.png'
import '/styles/error404.css'

const Eror404 = () => {
    return (
        <section className="mainSection">
            <div className='imgErrorContainer'>
                <img src={error} alt="imgError" className='imgError' />
                <Link to={'/'} className='goBackBtn'> Volver al inicio </Link>
            </div>
               
        </section>
    );
};

export default Eror404;