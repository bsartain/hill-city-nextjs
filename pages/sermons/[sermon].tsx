import { useState, useEffect, useContext } from "react";
import { Store } from "context/context";
import Layout from "components/Layout";
import Header from "components/Header";
import { useRouter } from "next/router";
import { formatDate, crossway } from "utils";
import { ga } from "ga";

interface BiblePassageModel {
  passages: Array<string>;
}

const Sermon = ({ data }) => {
  const [biblePassage, setBiblePassage] = useState({} as BiblePassageModel);
  const { setOpenMediaDrawer, setSingleSermon } = useContext(Store);
  const router = useRouter();
  const selectedSermon = data.filter((item: any) => item.slug === router.query.sermon);
  useEffect(() => {
    async function getBiblePassage() {
      if (selectedSermon.length > 0) {
        const esvPassage: any = await crossway(selectedSermon[0].bible_passage);
        setBiblePassage(esvPassage);
        setSingleSermon(selectedSermon);
      }
    }
    getBiblePassage();
  }, [setSingleSermon]);

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
    <Layout title='Sermons' meta={selectedSermon[0]}>
      {!selectedSermon
        ? "Loading..."
        : selectedSermon.map((sermon: any, index: number) => {
            return (
              <span key={index}>
                <Header data={selectedSermon} router={router} />
                <div className='container mt-5 text-center' key={index}>
                  <small>{formatDate(sermon.date)}</small>
                  <h1 className='mt-3'>{sermon.title}</h1>
                  <div className='sermon-details-container'>
                    <div className='sermon-detail'>
                      Preacher:&nbsp;
                      {sermon.preacher.map((preacher: any, index: number) => {
                        return (
                          <span key={index} className='me-4'>
                            {preacher.name}
                          </span>
                        );
                      })}
                    </div>
                    <div className='sermon-detail'>
                      Series:&nbsp;
                      {sermon.sermon_series.map((series: any, index: number) => {
                        return (
                          <span key={index} className='me-4'>
                            {series.name}
                          </span>
                        );
                      })}
                    </div>
                    <div className='sermon-detail'>
                      Passage:&nbsp;
                      <span key={index} className='me-4'>
                        {sermon.bible_passage}
                      </span>
                    </div>
                    <div className='sermon-detail'>
                      Small Group Questions:&nbsp;
                      {sermon.small_group_questions ? (
                        <a href={sermon.small_group_questions} target='_blank'>
                          <i className='fa-solid fa-file-pdf small-group-pdf'></i>
                        </a>
                      ) : null}
                    </div>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: sermon.content }}></div>
                </div>
                <div className='d-flex justify-content-center'>
                  <i
                    className='fa-sharp fa-solid fa-circle-play fa-circle-play-sermon'
                    onClick={() => {
                      setSingleSermon([sermon]);
                      setOpenMediaDrawer(true);
                    }}></i>
                </div>
                <div className='bible-passage-container container'>
                  {biblePassage && biblePassage.passages
                    ? biblePassage.passages.map((item: any, index: number) => {
                        return (
                          <div
                            className='bible-passage'
                            dangerouslySetInnerHTML={{ __html: item }}
                            key={index}
                          />
                        );
                      })
                    : null}
                </div>
              </span>
            );
          })}
    </Layout>
  );
};

export default Sermon;

export async function getServerSideProps(context) {
  const response = await fetch("https://hillcitysc.com/wp-json/hc/v1/hc-sermons");
  const json = await response.json();
  return {
    props: { data: json },
  };
}
