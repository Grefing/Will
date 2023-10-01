import { useState } from "react";
import { FaStar } from "react-icons/fa";

const Puntuacion = () => {
    const [rating, setRating] = useState(null);

    console.log(rating);

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={star}>
            <input type="radio" name="rating" onClick={() => setRating(currentRating)}/>
            <FaStar size={50}></FaStar>
          </label>
        );
      })}
    </div>
  );
};

export default Puntuacion;
