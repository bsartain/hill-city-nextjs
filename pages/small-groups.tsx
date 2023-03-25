import Layout from "../components/Layout";
import { useContext, useState } from "react";
import { Store } from "context/context";
import Header from "../components/Header";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import { formatDate } from "utils";

const SmallGroupsPage = ({ data, sermonData }) => {
  const { setOpenMediaDrawer, setSingleSermon } = useContext(Store);
  const router = useRouter();
  const [sermons, setSermons] = useState(sermonData.slice(0, 300));
  const [pageNumber, setPageNumber] = useState(0);
  const sermonsPerPage = 12;
  const pagesVisited = pageNumber * sermonsPerPage;

  const displaySermons = sermons
    .slice(pagesVisited, pagesVisited + sermonsPerPage)
    .map((sermon: any, index: number) => {
      return (
        <div className='card' key={index}>
          <div
            className='sermon-card-background-image'
            style={{ backgroundImage: `url(${sermon.featured_image.large})` }}></div>
          <div className='card-body'>
            <h5 className='card-title'>{sermon.title}</h5>
            <small>{formatDate(sermon.date)}</small>
            <div className='small-group-icons'>
              <i
                className='fa-sharp fa-solid fa-file-pdf'
                onClick={() => window.open(sermon.small_group_questions)}></i>
              <i
                className='fa-solid fa-microphone'
                onClick={() => {
                  setSingleSermon([sermon]);
                  setOpenMediaDrawer(true);
                }}></i>
            </div>
          </div>
        </div>
      );
    });

  const pageCount = Math.ceil(sermons.length / sermonsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Layout title='Small Groups' meta={data[0]}>
      {!data
        ? "Loading..."
        : data.map((item, index) => {
            return (
              <span key={index}>
                <Header data={data} router={router} />
                <div className='container mt-5' key={index}>
                  <h1>{item.title.rendered}</h1>
                  <div dangerouslySetInnerHTML={{ __html: item.content.rendered }} />
                </div>
                <div className='container mt-5 small-groups-page-container'>
                  <div className='row d-flex justify-content-center'>
                    {displaySermons}
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
              </span>
            );
          })}
    </Layout>
  );
};

export default SmallGroupsPage;

export async function getServerSideProps(context) {
  const response = await fetch("https://hillcitysc.com/wp-json/wp/v2/pages?per_page=50");
  const sermonsResponse = await fetch(
    "https://hillcitysc.com/wp-json/hc/v1/hc-sermons?per_page=300"
  );
  const json = await response.json();
  const sermonJson = await sermonsResponse.json();
  const filter = json.filter((item) => item.id === 9942);
  return {
    props: { data: filter, sermonData: sermonJson },
  };
}
