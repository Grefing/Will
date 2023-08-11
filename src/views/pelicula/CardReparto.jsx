import '/styles/cardReparto.css'

const CardReparto = ({actor}) => {
    return (
        <div className='actorsContainer'>
            <img className="imgReparto" src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} alt="actor Img" />
            <h5 className="actorName">{`${actor.name} as `}<h5 style={{color: "#ff5e00"}}>{actor.character}</h5> </h5>
        </div>
    );
};

export default CardReparto;