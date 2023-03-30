import { useContext, useState } from "react";
import { Store } from "context/context";
import Layout from "components/Layout";
import Header from "components/Header";
import { useRouter } from "next/router";
import { formatDate } from "utils";
import ReactPaginate from "react-paginate";
import HeadingDivider from "components/HeadingDivider";

const SermonsPage = ({ data }) => {
  const router = useRouter();
  const { singleSermon, setSingleSermon } = useContext(Store);
  const [sermons, setSermons] = useState(data.slice(0, 300));
  const [pageNumber, setPageNumber] = useState(0);
  const sermonsPerPage = 12;
  const pagesVisited = pageNumber * sermonsPerPage;

  const displaySermons = sermons
    .slice(pagesVisited, pagesVisited + sermonsPerPage)
    .map((sermon: any, index: number) => {
      return (
        <div className='card' key={index} onClick={() => routeToSingleSermon(sermon)}>
          <div
            className='sermon-card-background-image'
            style={{ backgroundImage: `url(${sermon.featured_image.large})` }}></div>
          <div className='card-body'>
            {sermon.sermon_series.map((series: any, index: number) => {
              return (
                <span key={index} className='fst-italic card-series'>
                  {series.name}
                </span>
              );
            })}
            <h5 className='card-title'>{sermon.title}</h5>
            <small>{formatDate(sermon.date)}</small>
            <div className='preacher-passage-container'>
              <div>
                <small className='card-preacher'>Preacher: </small>
                {sermon.preacher.map((preacher: any, index: number) => {
                  return <small key={index}>{preacher.name}</small>;
                })}
              </div>
              <span className='card-divider'>|</span>
              <div>
                <small>
                  <span className='card-passage'>Passage:</span> {sermon.bible_passage}
                </small>
              </div>
            </div>
          </div>
        </div>
      );
    });

  const routeToSingleSermon = (sermon) => {
    setSingleSermon([sermon]);
    router.push(`/sermons/${sermon.slug}`);
  };

  const pageCount = Math.ceil(sermons.length / sermonsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const meta = {
    title: {
      rendered: "Hill City Sermons.",
    },
    better_featured_image: {
      media_details: {
        sizes: {
          medium: {
            source_url: "https://hillcitysc.com/wp-content/uploads/2019/12/bible-podcast.jpg",
          },
        },
      },
    },
    excerpt: {
      rendered:
        "All sermon audio is available for free on this website, iTunes or your favorite podcast app. Simply subscribe to the Hill City Church Audio podcast.",
    },
  };

  return (
    <Layout title='Hill City Church: Sermons' meta={meta}>
      <span>
        <Header data={[data[0]]} router={router} />
        <div className='container mt-5 sermon-page-container'>
          <div className='sermon-podcast-blurb'>
            All sermon audio is available for free on iTunes or your favorite podcast app.
            <br /> Simply subscribe to the Hill City Church Audio podcast.
            <div className='podcast-icons'>
              <a
                href='https://podcasts.apple.com/us/podcast/hill-city-church-rock-hill-sc/id1529110625'
                target='_blank'
                rel='noreferrer'>
                <i className='fa-solid fa-podcast'></i>
              </a>
              <a
                href='https://open.spotify.com/show/689D8k7FZnLQe1KZTJKEZh?si=73dccf8187964e6c'
                target='_blank'
                rel='noreferrer'>
                <i className='fab fa-spotify'></i>
              </a>
              <a
                href='https://www.stitcher.com/show/hill-city-church'
                target='_blank'
                rel='noreferrer'>
                <i className='fa-sharp fa-solid fa-chart-simple'></i>
              </a>
            </div>
          </div>
          <h1>Current Sermons</h1>
          <HeadingDivider />
          <div className='row d-flex justify-content-center'>
            {displaySermons}
            <div className='pagination-container'>
              <ReactPaginate
                previousLabel={<i className='fa-solid fa-chevrons-left'></i>}
                nextLabel={<i className='fa-solid fa-chevrons-right'></i>}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBtns"}
                previousLinkClassName={"previousBtn"}
                nextLinkClassName={"nextBtn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
              />
            </div>
          </div>
        </div>
      </span>
    </Layout>
  );
};

export default SermonsPage;

export async function getServerSideProps(context) {
  const response = await fetch("https://hillcitysc.com/wp-json/hc/v1/hc-sermons?per_page=300");
  const json = await response.json();
  return {
    props: { data: json },
  };
}
