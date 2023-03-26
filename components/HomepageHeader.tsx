import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Link from "next/link";

const HomepageHeader: React.FC<{ homepageSlides: Array<object>; homepageExcerpt: string }> = ({
  homepageSlides,
  homepageExcerpt,
}) => {
  const setHeaderText = () => {
    const date = new Date();
    const day = date.getDay();
    const hours = date.getHours();
    if (day === 0 && hours < 12) {
      return (
        <div>
          <h1>JOIN OUR LIVE STREAM</h1>
          <Link href='/live-stream' className='btn btn-outline-primary'>
            JOIN LIVESTREAM
          </Link>
        </div>
      );
    } else {
      return <h1>WELCOME</h1>;
    }
  };
  return (
    <div className='home-header-background-image-container'>
      <Carousel fade indicators={false} controls={false}>
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
                  <p>FOLLOWING JESUS FOR THE FLOURISHING OF ROCK HILL.</p>
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
                      <h5 className='home-title'>HILL CITY CHURCH</h5>
                      <div className='hr-container'>
                        <div className='hr-one' />
                      </div>
                      {setHeaderText()}
                      <p className='home-excerpt'>{homepageExcerpt}</p>
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
