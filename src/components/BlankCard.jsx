/* eslint-disable react/prop-types */
// import imageSrc from '../assets/Camera Roll/download (5).jpeg'; // Import your image file
import loc from '../assets/react.svg';

const BlankCard = ({business_name,business_image, business_address, main_category, business_number, rating}) => {
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
        <img src={business_image} alt="Your Image" className="card-image" />
        <div className="card-content">
            <div className='h1'>
             {business_name}
          </div>
          <div className="rating-box">
            {rating}
            {/* Ratting */}
            <div className="stars">{renderStars()}</div>
          </div>
          {/* Content goes here */}
          <div className="location">
            <img src={loc} alt="Location Icon" className="location-img" />
            <p>{business_address}</p>
           
          </div>
          <div className="category-box">
            {main_category}
          </div>
          <div className="buttons">
              <button className="button" id='mobile'>{business_number}</button>
              <button className="button">Send Location</button>
              <button className="button">Rate Us</button>
            </div>  
        </div>
      </div>
    </div>
  );
};

export default BlankCard;




// const BlankCard = ({
//   business_name, 
//   business_image,
//   business_address,
//   main_category,
//   business_number,
//   ratings
// }) => {

//   return (
//     <div>BlankCard</div>
//   );
// }
// export default BlankCard

// import React from 'react'

// const BlankCard = () => {
//   return (
//     <div className=' bg-slate-400 w-full'>BlankCard</div>
//   )
// }

// export default BlankCard