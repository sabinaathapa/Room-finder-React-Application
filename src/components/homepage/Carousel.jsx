import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

const CarouselComponent = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);

    // Restart from the first image when the third image is reached
    if (selectedIndex === 3) {
      setIndex(0);
    }
  };

  return (
    <Carousel interval={500} activeIndex={index} onSelect={handleSelect} style={{ maxHeight: '500px', margin: '0 auto' }}>
      <Carousel.Item style={{ height: '500px', overflow: 'hidden' }}>
        <img
          className="d-block w-100"
          src="src\assets\images\1.jpg"
          alt="First slide"
          style={{ objectFit: 'cover', height: '100%' }}
        />
        <Carousel.Caption>
          <h3>First Image</h3>
          <p>Some description for the first image.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{ height: '500px', overflow: 'hidden' }}>
        <img
          className="d-block w-100"
          src="src\assets\images\2.jpg"
          alt="Second slide"
          style={{ objectFit: 'cover', height: '100%' }}
        />
        <Carousel.Caption>
          <h3>Second Image</h3>
          <p>Some description for the second image.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{ height: '500px', overflow: 'hidden' }}>
        <img
          className="d-block w-100"
          src="src\assets\images\3.jpg"
          alt="Third slide"
          style={{ objectFit: 'cover', height: '100%' }}
        />
        <Carousel.Caption>
          <h3>Third Image</h3>
          <p>Some description for the third image.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;
