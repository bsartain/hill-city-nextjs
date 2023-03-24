import Link from "next/link";
import Layout from "../components/Layout";
import HomepageHeader from "../components/HomepageHeader";

const IndexPage = (props) => {
  const {
    homePage: {
      acf: { homepage_slides, homepage_excerpt, homepage, homepage_service_times, homepage_map },
    },
  } = props;

  const meta = {
    title: {
      rendered: "Following Jesus For The Flourishing of Rock Hill.",
    },
    better_featured_image: {
      media_details: {
        sizes: {
          medium: { source_url: "https://hillcitysc.com/wp-content/uploads/2018/07/IMG_0947.jpg" },
        },
      },
    },
    excerpt: {
      rendered:
        "Hill City Church exists in following Jesus for the flourishing of Rock Hill. Join us this Sunday as we meet in the Gettys Art Center in downtown Rock Hill for a time of worship, prayer, the preaching of the Word, and communion. All are welcome.",
    },
  };

  return (
    <Layout title=' | Home' meta={meta}>
      <HomepageHeader homepageSlides={homepage_slides} homepageExcerpt={homepage_excerpt} />
      <section className='homepage-section'>
        <div className='container' dangerouslySetInnerHTML={{ __html: homepage_service_times }} />
      </section>
      <section>
        <iframe
          src={homepage_map}
          width='100%'
          height='450'
          frameBorder='0'
          aria-hidden='false'
          tabIndex={0}
          title='Hill City Church Map'
          style={{ border: "0px" }}></iframe>
      </section>
      {!homepage
        ? null
        : homepage.map((section: any, index: number) => {
            const backgroundImageStyles = section.image
              ? {
                  padding: "350px 0",
                  background: section.background_color,
                  backgroundImage: `url(${section.image})`,
                  backgroundPosition: "center center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }
              : {
                  padding: "80px",
                  background: section.background_color,
                  backgroundImage: `url(${section.image})`,
                  backgroundPosition: "center center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                };
            const contentStyles = {
              color: section.text_color,
              fontSize: "3.5em",
              lineHeight: "1.15",
              marginBottom: "30px",
            };
            return (
              <section key={index} style={backgroundImageStyles} className='homepage-section'>
                <div
                  className='homepage-content-container'
                  dangerouslySetInnerHTML={{ __html: section.content }}
                  style={contentStyles}
                />
              </section>
            );
          })}
    </Layout>
  );
};

export default IndexPage;

export async function getServerSideProps(context) {
  const homePageData = await fetch("https://hillcitysc.com/wp-json/acf/v3/posts/86");
  const homePageDataJson = await homePageData.json();
  return {
    props: { homePage: homePageDataJson },
  };
}
