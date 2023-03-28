import Layout from "../components/Layout";
import Header from "../components/Header";
import spurgeon from "../data/spurgeon.json";
import wisdom from "data/wisdom.json";
import { RefTagger } from "react-reftagger";
import { useRouter } from "next/router";
import { crossway, todaysDate } from "utils";

const Devotional = ({ data, psalms, proverbs, ecclesiastes }) => {
  const router = useRouter();
  const setTodaysDevo = () => {
    // eslint-disable-next-line array-callback-return
    return spurgeon.map((item: any) => {
      let today: any = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1;

      today = mm + "/" + dd;

      if (item.date === today) {
        return (
          <div key={item.id} className='container'>
            <RefTagger bibleVersion={"ESV"} />
            <div
              className='devotional-content'
              dangerouslySetInnerHTML={{ __html: item.body }}></div>
            <div />
          </div>
        );
      }
    });
  };

  const setWisdomReading = () => {
    return (
      <div className='container widom-section-container'>
        <h1 className='wisdom-header'>Todays Wisdom Meditations</h1>
        <div className='wisdom-content' dangerouslySetInnerHTML={{ __html: psalms }}></div>
        <div />
        <div className='wisdom-content' dangerouslySetInnerHTML={{ __html: proverbs }}></div>
        <div />
        <div className='wisdom-content' dangerouslySetInnerHTML={{ __html: ecclesiastes }}></div>
        <div />
      </div>
    );
  };

  const meta = {
    title: {
      rendered: "Charles Spurgeon: Todays Daily Devotional.",
    },
    better_featured_image: {
      media_details: {
        sizes: {
          medium: { source_url: "/images/Bible-Open-Coffee-Notes.jpeg" },
        },
      },
    },
    excerpt: {
      rendered:
        "In the same way the sun never grows weary of shining, nor a stream of flowing, it is God and His nature to keep His promises. Therefore, go immediately to His throne and say, Do as You promised.",
    },
  };

  return (
    <Layout title='Spurgeon Daily Devotional' meta={meta}>
      {!data
        ? "Loading..."
        : data.map((item, index) => {
            return (
              <span key={index} className='devotion-container'>
                <Header data={data} router={router} />
                <div className='container mt-5' key={index}>
                  <h1>{item.title.rendered}</h1>
                  <div dangerouslySetInnerHTML={{ __html: item.content.rendered }}></div>
                  <div className='devotional-container'>{setTodaysDevo()}</div>
                  <div className='wisdom-meditations'>{setWisdomReading()}</div>
                </div>
              </span>
            );
          })}
    </Layout>
  );
};

export default Devotional;

export async function getServerSideProps(context) {
  const response = await fetch("https://hillcitysc.com/wp-json/wp/v2/pages?per_page=50");
  const json = await response.json();
  const filter = json.filter((item) => item.id === 9196);
  const todaysDateCurrent: any = await wisdom.filter((item: any) => item.date === todaysDate());
  const psalms: any = await crossway(todaysDateCurrent[0].psalms);
  const proverbs: any = await crossway(todaysDateCurrent[0].proverbs);
  const ecclesiastes: any = await crossway(todaysDateCurrent[0].ecclesiastes);
  return {
    props: {
      data: filter,
      psalms: psalms.passages[0],
      proverbs: proverbs.passages[0],
      ecclesiastes: ecclesiastes.passages[0],
    },
  };
}
