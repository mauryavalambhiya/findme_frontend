/* eslint-disable react/prop-types */
import imageSrc from '../assets/Camera Roll/download (7).jpeg'; // Import your image file
import loc from '../assets/react.svg';

const BlankCard = ({ rating }) => {
  const renderStars = () => {
    const stars = [];
      for (let i = 0; i < 5; i++) {
        if (i < rating) {
          stars.push(<span key={i} className="star filled">&#9733;</span>);
        } else {
          stars.push(<span key={i} className="star">&#9733;</span>);
        }
      }
    return stars;
  };

  return (
    <div className="container">
      <div className="card">
        <img src={imageSrc} alt="Your Image" className="card-image" />
        <div className="card-content">
            <div className='h1'>
             Jai Gopal Restaurant
          </div>
          <div className="rating-box">
            {rating}
            <div className="stars">{renderStars()}</div>
          </div>
          {/* Content goes here */}
          <div className="location">
            <img src={loc} alt="Location Icon" className="location-img" />
            <p>nana mova road,Rajkot</p>
           
          </div>
          <div className="category-box">
            Education
          </div>
          <div className="buttons">
              <button className="button" id='mobile'>9723130309</button>
              <button className="button">Send Location</button>
              <button className="button">Rate Us</button>
            </div>  
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line no-irregular-whitespace
export default BlankCard;