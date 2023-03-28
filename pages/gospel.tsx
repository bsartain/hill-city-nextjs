import Layout from "../components/Layout";
import Header from "../components/Header";
import { useRouter } from "next/router";
import { RefTagger } from "react-reftagger";
import HeadingDivider from "components/HeadingDivider";

const Gospel = ({ data }) => {
  const router = useRouter();
  return (
    <Layout title='The Gospel' meta={data[0]}>
      {!data
        ? "Loading..."
        : data.map((item, index) => {
            return (
              <span key={index}>
                <Header data={data} router={router} />
                <div className='container mt-5' key={index}>
                  <h1>{item.title.rendered}</h1>
                  <HeadingDivider />
                  <RefTagger bibleVersion={"ESV"} />
                  <div dangerouslySetInnerHTML={{ __html: item.content.rendered }}></div>
                </div>
              </span>
            );
          })}
    </Layout>
  );
};

export default Gospel;

export async function getServerSideProps(context) {
  const response = await fetch("https://hillcitysc.com/wp-json/wp/v2/pages?per_page=50");
  const json = await response.json();
  const filter = json.filter((item) => item.id === 8042);
  return {
    props: { data: filter },
  };
}
