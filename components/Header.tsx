import Link from "next/link";

const Header = ({ data, router }) => {
  const setHeaderTitle = (item) => {
    if (router && router.pathname === "/sermons") {
      return <h1>Sermons</h1>;
    } else if (router && router.pathname === "/sermons/[sermon]") {
      return <h1>{item.title}</h1>;
    } else {
      return <h1>{item.title.rendered}</h1>;
    }
  };
  return (
    <div className='header-background-image-container'>
      {data
        ? data.map((item: any, index: number) => {
            return (
              <div
                className='header-background-image'
                key={index}
                style={{
                  backgroundImage: `url(${
                    item && item.better_featured_image && item.better_featured_image.media_details
                      ? item.better_featured_image.media_details.sizes.large.source_url
                      : item.featured_image.large
                  })`,
                }}>
                <div className='d-flex align-items-center justify-content-center h-100'>
                  <div className='overlay'></div>
                  <div className='title-header-container'>
                    <h6>HILL CITY CHURCH</h6>
                    <div className='d-flex align-items-center justify-content-center'>
                      <div className='title-divider'></div>
                    </div>
                    {setHeaderTitle(item)}
                    <div>
                      {router && router.pathname === "/sermons/[sermon]" ? (
                        <Link href='/sermons' className='btn btn-outline-primary'>
                          BACK TO SERMONS
                        </Link>
                      ) : null}
                    </div>
                    <div>
                      <i
                        className='fa-regular fa-angle-down'
                        onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}></i>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Header;
