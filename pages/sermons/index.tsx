import { useContext, useState, useEffect } from "react";
import { Store } from "context/context";
import Layout from "components/Layout";
import Header from "components/Header";
import { useRouter } from "next/router";
import { formatDate } from "utils";
import ReactPaginate from "react-paginate";
import HeadingDivider from "components/HeadingDivider";
import { Spinner } from "react-bootstrap";

let params = { preacher: "", sermonSeries: "", book: "" };

const SermonsPage = ({ data }) => {
  const router = useRouter();
  const { singleSermon, setSingleSermon } = useContext(Store);
  const [sermonFilteredParameters, setSermonFilteredParameters] = useState({
    preacher: "",
    sermonSeries: "",
    book: "",
  });
  const [spinner, setSpinner] = useState(false);
  const [sermons, setSermons] = useState(data.slice(0, 300));
  const [pageNumber, setPageNumber] = useState(0);
  const sermonsPerPage = 12;
  const pagesVisited = pageNumber * sermonsPerPage;

  const preacherList: any = [];
  const seriesList = [];
  const bibleBookList = [];

  data.forEach((item: any) => {
    if (item.preacher) {
      item.preacher.forEach((preacher: any) => {
        preacherList.push(preacher.name);
      });
    }
    if (item.sermon_series) {
      item.sermon_series.forEach((series: any) => {
        seriesList.push(series.name);
      });
    }
    if (item.bible_book) {
      item.bible_book.forEach((book: any) => {
        bibleBookList.push(book.name);
      });
    }
  });

  const preachers = Array.from(new Set(preacherList));
  const series = Array.from(new Set(seriesList));
  const bibleBook = Array.from(new Set(bibleBookList));

  const displaySermons = sermons.slice(pagesVisited, pagesVisited + sermonsPerPage).map((sermon: any, index: number) => {
    return (
      <div className='card' key={index} onClick={() => routeToSingleSermon(sermon)}>
        <div className='sermon-card-background-image' style={{ backgroundImage: `url(${sermon.featured_image.large})` }}></div>
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

  const getFilteredSermons = async (value: string, param: string) => {
    setSpinner(true);
    if (param === "preacher") {
      params.preacher = value;
    } else if (param === "sermonSeries") {
      params.sermonSeries = value;
    } else if (param === "book") {
      params.book = value;
    }

    const myUrlWithParams = new URL("https://hillcitysc.com/wp-json/hc/v1/hc-sermons");

    if (params.preacher) {
      myUrlWithParams.searchParams.append("preacher", params.preacher);
    }
    if (params.sermonSeries) {
      myUrlWithParams.searchParams.append("series", params.sermonSeries);
    }
    if (params.book) {
      myUrlWithParams.searchParams.append("book", params.book);
    }

    const response: any = await fetch(myUrlWithParams.href, {
      method: "GET",
      headers: {
        Accept: "application/json;version=1",
      },
    });

    const json = await response.json();
    setSpinner(false);
    setSermons(json.slice(0, 300));
  };

  useEffect(() => {
    const getUrlParams = () => {
      if (router.query.preacher) {
        const preacherName: any = router.query.preacher;
        getFilteredSermons(preacherName, "preacher");
        setSermonFilteredParameters((prevParams) => ({
          ...prevParams,
          preacher: preacherName,
        }));
      }
    };
    getUrlParams();
  }, [setSermonFilteredParameters]);

  return (
    <Layout title='Hill City Church: Sermons' meta={meta}>
      <span>
        <Header data={[data[0]]} router={router} />
        <div className='container mt-5 sermon-page-container'>
          <div className='sermon-podcast-blurb'>
            All sermon audio is available for free on iTunes or your favorite podcast app.
            <br /> Simply subscribe to the Hill City Church Audio podcast.
            <div className='podcast-icons'>
              <a href='https://podcasts.apple.com/us/podcast/hill-city-church-rock-hill-sc/id1529110625' target='_blank' rel='noreferrer'>
                <i className='fa-solid fa-podcast'></i>
              </a>
              <a href='https://open.spotify.com/show/689D8k7FZnLQe1KZTJKEZh?si=73dccf8187964e6c' target='_blank' rel='noreferrer'>
                <i className='fab fa-spotify'></i>
              </a>
              <a href='https://www.stitcher.com/show/hill-city-church' target='_blank' rel='noreferrer'>
                <i className='fa-sharp fa-solid fa-chart-simple'></i>
              </a>
            </div>
          </div>
          <h1>Current Sermons</h1>
          <HeadingDivider />
          <div className='d-flex justify-content-center mt-4 mb-4 sermon-filter'>
            {spinner ? <Spinner animation='border' style={{ marginTop: "25px", marginRight: "10px" }} /> : null}
            <div className='mb-4 me-2'>
              <label>Preacher</label>
              <select
                className='form-select'
                value={sermonFilteredParameters.preacher}
                onChange={(e) => {
                  {
                    setSermonFilteredParameters({
                      ...sermonFilteredParameters,
                      preacher: e.target.value,
                    });
                    getFilteredSermons(e.target.value, "preacher");
                  }
                }}>
                <option value=''>...</option>
                {preachers
                  ? preachers.map((preacher: any, index: number) => {
                      return (
                        <option value={preacher} key={index}>
                          {preacher}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
            <div className='mb-4 me-2'>
              <label>Series</label>
              <select
                className='form-select'
                value={sermonFilteredParameters.sermonSeries}
                onChange={(e) => {
                  {
                    setSermonFilteredParameters({
                      ...sermonFilteredParameters,
                      sermonSeries: e.target.value,
                    });
                    getFilteredSermons(e.target.value, "sermonSeries");
                  }
                }}>
                <option value=''>...</option>
                {series
                  ? series.map((series: any, index: number) => {
                      return (
                        <option value={series} key={index}>
                          {series}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
            <div className='mb-4'>
              <label>Bible Book</label>
              <select
                className='form-select'
                value={sermonFilteredParameters.book}
                onChange={(e) => {
                  {
                    setSermonFilteredParameters({
                      ...sermonFilteredParameters,
                      book: e.target.value,
                    });
                    getFilteredSermons(e.target.value, "book");
                  }
                }}>
                <option value=''>...</option>
                {bibleBook
                  ? bibleBook.map((book: any, index: number) => {
                      return (
                        <option value={book} key={index}>
                          {book}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
          </div>
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
