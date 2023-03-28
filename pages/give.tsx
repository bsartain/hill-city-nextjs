import Layout from "../components/Layout";
import Header from "../components/Header";
import { useRouter } from "next/router";
import HeadingDivider from "components/HeadingDivider";

const GivePage = ({ data }) => {
  const router = useRouter();
  return (
    <Layout title='About Us' meta={data[0]}>
      {!data
        ? "Loading..."
        : data.map((item, index) => {
            return (
              <span key={index}>
                <Header data={data} router={router} />
                <div className='container mt-5' key={index}>
                  <h1>{item.title.rendered}</h1>
                  <HeadingDivider />
                  <div dangerouslySetInnerHTML={{ __html: item.content.rendered }} />
                  <a
                    href='https://hillcitysc.churchcenter.com/giving?open-in-church-center-modal=true'
                    className='btn btn-primary btn-lg'
                    target='_blank'>
                    Give Online
                  </a>
                </div>
              </span>
            );
          })}
    </Layout>
  );
};

export default GivePage;

export async function getServerSideProps(context) {
  const response = await fetch("https://hillcitysc.com/wp-json/wp/v2/pages?per_page=50");
  const json = await response.json();
  const filter = json.filter((item) => item.id === 10313);
  return {
    props: { data: filter },
  };
}
