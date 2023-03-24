import React from "react";
import Carousel from "react-bootstrap/Carousel";

const HomepageHeader: React.FC<{ homepageSlides: Array<object>; homepageExcerpt: string }> = ({
  homepageSlides,
  homepageExcerpt,
}) => {
  return (
    <div className='home-header-background-image-container'>
      <Carousel fade indicators={false}>
        {!homepageSlides ? (
          <Carousel.Item
            className='header-background-image'
            style={{
              backgroundImage: `url("/images/Jesus.jpg")`,
            }}>
            <div className='overlay'></div>
            <Carousel.Caption>
              <div className='homepage-carousel-title-container'>
                <div className='homepage-carousel-header-content'>
                  <h5>HILL CITY CHURCH</h5>
                  <div className='hr-container'>
                    <div className='hr-one' />
                  </div>
                  <h1>JESUS</h1>
                  <h6>FOLLOWING JESUS FOR THE FLOURISHING OF ROCK HILL.</h6>
                  <div className='page-header-arrow-home-page'>
                    <i className='now-ui-icons  arrows-1_minimal-down'></i>
                  </div>
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ) : (
          homepageSlides.map((image: any, index: number) => {
            return (
              <Carousel.Item
                className='header-background-image'
                key={index}
                style={{
                  backgroundImage: `url(${image.slides})`,
                }}>
                <div className='overlay'></div>
                <Carousel.Caption>
                  <div className='homepage-carousel-title-container'>
                    <div className='homepage-carousel-header-content'>
                      <h5>HILL CITY CHURCH</h5>
                      <div className='hr-container'>
                        <div className='hr-one' />
                      </div>
                      <h1>WELCOME</h1>
                      <h6>{homepageExcerpt}</h6>
                      <div className='page-header-arrow-home-page'>
                        <i className='now-ui-icons  arrows-1_minimal-down'></i>
                      </div>
                    </div>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })
        )}
      </Carousel>
    </div>
  );
};

export default HomepageHeader;
