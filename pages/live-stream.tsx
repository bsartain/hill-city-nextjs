import { useState, useEffect, useRef, useContext } from "react";
import { Store } from "context/context";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { useRouter } from "next/router";
import { Tabs, Tab, Modal, Spinner, Alert } from "react-bootstrap";
import { crossway } from "utils";
import catechism from "data/catechismData.json";
import { nextSundaysDate } from "utils";
import ReactToPrint from "react-to-print";

interface ServiceOrderModel {
  callToWorship: any;
  songOneTitle: string;
  songOneLyrics: string;
  confession: any;
  assurance: any;
  songTwoTitle: string;
  songTwoLyrics: string;
  childrensSermon: string;
  scriptureReading: any;
  preacher: string;
  catechism: string;
  songThreeTitle: string;
  songThreeLyrics: string;
  benediction: any;
  specialReading: Array<object>;
  miscellaneous: string;
  announcements: Array<object>;
  prayerRequests: Array<object>;
}

const OrderOfService = ({ data, orderOfService }) => {
  const [serviceOrder, setServiceOrder] = useState({} as ServiceOrderModel);
  const [printLogo, setPrintLogo] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [showConnectCard, setShowConnectCard] = useState(false);
  const [alert, setAlert] = useState({
    success: false,
    failed: false,
  });
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const { liveStreamPageStyles } = useContext(Store);
  const { acf } = orderOfService;
  const componentRef = useRef();
  const youtubeLink = acf.youtube_link
    ? acf.youtube_link.replace("live", "embed")
    : acf.youtube_link;

  const router = useRouter();

  useEffect(() => {
    const setTheOrderOfServiceState = async () => {
      setServiceOrder({
        ...serviceOrder,
        callToWorship: await crossway(acf.call_to_worship_verse),
        songOneTitle: acf.song_one_title,
        songOneLyrics: acf.song_one_lyrics,
        confession: await crossway(acf.confession_of_sin_verse),
        assurance: await crossway(acf.assurance_of_grace_verse),
        songTwoTitle: acf.song_two_title,
        songTwoLyrics: acf.song_two_lyrics,
        childrensSermon: acf.childrens_sermon,
        scriptureReading: await crossway(acf.scripture_reading),
        preacher: acf.preacher,
        catechism: acf.catechism_question_number,
        songThreeTitle: acf.song_three_title,
        songThreeLyrics: acf.song_three_lyrics,
        benediction: await crossway(acf.benediction_verse),
        specialReading: acf.special_reading_fields,
        miscellaneous: acf.miscellaneous_info,
        announcements: acf.announcements_section,
        prayerRequests: acf.prayer_requests_section,
      });
    };
    setTheOrderOfServiceState();
  }, [setServiceOrder]);

  const setCatechism = () => {
    const filterCatechismNumber = catechism
      .filter((item: any, index: number) => index + 1 === Number(serviceOrder.catechism))
      .map((item: any, index: number) => {
        return (
          <div key={serviceOrder.catechism} className='catechism'>
            <h3 className='mb-0'>Catechism Question {serviceOrder.catechism}</h3>
            <div className='mb-4 catechism-text'>
              All questions are from the{" "}
              <a href='http://newcitycatechism.com/' target='_blank' rel='noopener noreferrer'>
                New City Catechism
              </a>
            </div>
            <div className='mb-3 catechism-text'>
              <strong>Question: </strong>
              <span>{item.question}</span>
            </div>
            <div className='catechism-text'>
              <strong>Answer: </strong>
              <span>{item.answer.adult}</span>
            </div>
          </div>
        );
      });
    return filterCatechismNumber;
  };

  const pageStyle = `
  @page {
    size: 190mm 220mm;
  }
  @media all {
    
  }
`;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSpinner(true);
    const response = await fetch("api/mail", {
      method: "POST",
      body: JSON.stringify(form),
    });
    setSpinner(false);
    if (response.ok) {
      setAlert({ ...alert, success: true });
      setTimeout(() => {
        setAlert({ ...alert, success: false });
      }, 5000);
      setForm({ ...form, name: "", email: "", phone: "" });
    } else {
      setAlert({ ...alert, failed: true });
      setTimeout(() => {
        setAlert({ ...alert, failed: false });
      }, 5000);
    }
  };

  return (
    <>
      <Layout title='Live Stream' meta={data[0]}>
        {!data && !acf
          ? "Loading..."
          : data.map((item: any, index: number) => {
              return (
                <div key={index} className='order-of-service-container'>
                  <Header data={data} router={router} />
                  <style>
                    {`.order-of-service-container p {
                        color: ${liveStreamPageStyles.color};
                        font-size: ${liveStreamPageStyles.fontSize}px
                      }
                      .order-of-service-container h2 {
                        color: ${liveStreamPageStyles.color};
                      }
                      .order-of-service-container h3 {
                        color: ${liveStreamPageStyles.color};
                      }
                      .catechism{
                        color: ${liveStreamPageStyles.color}           
                      }
                      .catechism-text{
                        font-size: ${liveStreamPageStyles.fontSize}px             
                      }
                    `}
                  </style>
                  <div className='container mt-5'>
                    <h1>{item.title.rendered}</h1>
                    <div className='d-flex justify-content-center mt-5 mb-3'>
                      <h3>WELCOME! OUR SERVICE WILL BEGIN AT 10:00 AM ON {nextSundaysDate()}</h3>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: item.content.rendered }}></div>
                  </div>
                  <iframe
                    width='100%'
                    height='500'
                    src={`${youtubeLink}`}
                    title='YouTube Live Stream: Hill City Church'
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  />
                  <div
                    className='container'
                    style={{
                      background: liveStreamPageStyles.background,
                    }}>
                    <div className='first-row-tabs'>
                      <ul className='nav nav-tabs'>
                        <li className='nav-item'>
                          <button
                            className='nav-link active me-2'
                            onClick={() => window.open(`${acf.youtube_link}`)}>
                            <i className='fa-brands fa-youtube'></i>
                            <div className='tab-text'>Watch on YouTube</div>
                          </button>
                        </li>
                        <li className='nav-item'>
                          <ReactToPrint
                            trigger={() => (
                              <button className='nav-link active me-2'>
                                <i className='fa-solid fa-print'></i>
                                <div className='tab-text'>Print Order of Service</div>
                              </button>
                            )}
                            content={() => componentRef.current}
                            onBeforePrint={() => {
                              setPrintLogo(true);
                            }}
                            onAfterPrint={() => setPrintLogo(false)}
                            pageStyle={pageStyle}
                          />
                        </li>
                        <li className='nav-item'>
                          <button
                            className='nav-link active'
                            onClick={() => setShowConnectCard(true)}>
                            <i className='fa-solid fa-address-card'></i>
                            <div className='tab-text'>Connect Card</div>
                          </button>
                          <Modal show={showConnectCard} onHide={() => setShowConnectCard(false)}>
                            <Modal.Header closeButton>
                              <Modal.Title>Let's Connect</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <form onSubmit={handleSubmit}>
                                <div className='form-floating mb-3'>
                                  <input
                                    type='text'
                                    className='form-control'
                                    id='floatingName'
                                    placeholder='Name'
                                    value={form.name ? form.name : ""}
                                    onChange={(e: any) =>
                                      setForm({ ...form, name: e.target.value })
                                    }
                                    required
                                  />
                                  <label htmlFor='floatingName'>Name</label>
                                </div>
                                <div className='form-floating mb-3'>
                                  <input
                                    type='email'
                                    className='form-control'
                                    id='floatingEmail'
                                    placeholder='name@example.com'
                                    value={form.email ? form.email : ""}
                                    onChange={(e: any) =>
                                      setForm({ ...form, email: e.target.value })
                                    }
                                    required
                                  />
                                  <label htmlFor='floatingEmail'>Email address</label>
                                </div>
                                <div className='form-floating'>
                                  <input
                                    type='text'
                                    className='form-control'
                                    id='floatingPhone'
                                    placeholder='Phone'
                                    value={form.phone ? form.phone : ""}
                                    onChange={(e: any) =>
                                      setForm({ ...form, phone: e.target.value })
                                    }
                                  />
                                  <label htmlFor='floatingPhone'>Phone/Text</label>
                                </div>
                                <div className='d-flex align-items-center'>
                                  <button type='submit' className='btn btn-primary mt-3'>
                                    Submit
                                  </button>
                                  {spinner ? (
                                    <Spinner
                                      animation='border'
                                      style={{ marginTop: "12px", marginLeft: "10px" }}
                                    />
                                  ) : null}
                                </div>
                              </form>
                              {alert.success ? (
                                <Alert key={"success"} variant={"success"} className='mt-3'>
                                  Your message was sent successfully. One of our Elders will review
                                  promptly and get back to you. God bless.
                                </Alert>
                              ) : null}
                              {alert.failed ? (
                                <Alert key={"danger"} variant={"danger"} className='mt-3'>
                                  Your message did not send. Please check the information and try
                                  again.
                                </Alert>
                              ) : null}
                            </Modal.Body>
                          </Modal>
                        </li>
                      </ul>
                    </div>
                    <Tabs
                      defaultActiveKey='orderOfService'
                      id='uncontrolled-tab-example'
                      className='mb-3'>
                      <Tab
                        eventKey='orderOfService'
                        title={
                          <>
                            <i className='fa-duotone fa-book-bible'></i>
                            <div className='tab-text'>Order Of Service</div>
                          </>
                        }>
                        <div className='order-of-service-container' ref={componentRef}>
                          {printLogo ? (
                            <div
                              style={{
                                display: "flex",
                                margin: "25px 0px",
                                justifyContent: "center",
                                borderBottom: "1px solid #eeeeee",
                                paddingBottom: "39px",
                                marginBottom: "39px",
                              }}>
                              <img
                                src='https://hillcitysc.com/wp-content/uploads/2021/02/HC-print-masthead-logo-e1612377440345.png'
                                alt='Hill City Church: Rock Hill SC'
                              />
                            </div>
                          ) : null}
                          {serviceOrder && serviceOrder.specialReading
                            ? serviceOrder.specialReading.map((item: any, index: number) => {
                                return (
                                  <div className='mt-5' key={index}>
                                    <h3>{item.special_reading_title}</h3>
                                    <div
                                      key={index}
                                      dangerouslySetInnerHTML={{
                                        __html: item.special_reading_content,
                                      }}
                                    />
                                    <div className='divider'></div>
                                  </div>
                                );
                              })
                            : null}
                          <h3 className='mt-5'>Call to Worship</h3>
                          {serviceOrder &&
                          serviceOrder.callToWorship &&
                          Object.keys(serviceOrder.callToWorship).length > 0
                            ? serviceOrder.callToWorship.passages.map(
                                (verse: any, index: number) => {
                                  return (
                                    <div key={index} dangerouslySetInnerHTML={{ __html: verse }} />
                                  );
                                }
                              )
                            : null}
                          <div className='divider'></div>
                          <h2 className='song-title'>Song: {serviceOrder.songOneTitle}</h2>
                          <div dangerouslySetInnerHTML={{ __html: serviceOrder.songOneLyrics }} />
                          <div className='divider'></div>
                          <h3>Confession Of Sin</h3>
                          <p className='mb-5'>
                            This is the time in our service where we confess our sins before God.
                            Cleansing and freedom begin with being honest with our sins and failures
                            before God so that He can restore us back to Joy and peace. Take a few
                            moments to confess sin before God. You can use this scripture to help
                            you do that.
                          </p>
                          {serviceOrder &&
                          serviceOrder.confession &&
                          Object.keys(serviceOrder.confession).length > 0
                            ? serviceOrder.confession.passages.map((verse: any, index: number) => {
                                return (
                                  <div key={index} dangerouslySetInnerHTML={{ __html: verse }} />
                                );
                              })
                            : null}
                          <div className='divider'></div>
                          <h3>Assurance Of Grace</h3>
                          <p className='mb-5'>
                            You cannot out sin God's grace. The power of the cross is such that
                            Jesus made His love and forgiveness more powerful toward you than your
                            offenses toward Him.
                          </p>
                          {serviceOrder &&
                          serviceOrder.assurance &&
                          Object.keys(serviceOrder.assurance).length > 0
                            ? serviceOrder.assurance.passages.map((verse: any, index: number) => {
                                return (
                                  <div key={index} dangerouslySetInnerHTML={{ __html: verse }} />
                                );
                              })
                            : null}
                          <div className='divider'></div>
                          <h3>Offertory</h3>
                          <p>
                            In response to what the Lord has done for us, let's worship Him in the
                            giving of our tithes and offerings.
                          </p>
                          <p>
                            We do this as an expression of joy and gratitude, not obligation. Below
                            you'll find a link to our giving page. If you are a member of Hill City
                            Church please give joyously and generously.
                          </p>
                          <a
                            href='https://hillcitysc.churchcenter.com/giving?open-in-church-center-modal=true'
                            className='btn btn-primary btn-lg'>
                            Give Online
                          </a>
                          <div className='divider'></div>
                          <h2 className='song-title'>Song: {serviceOrder.songTwoTitle}</h2>
                          <div
                            key={index}
                            dangerouslySetInnerHTML={{ __html: serviceOrder.songTwoLyrics }}
                          />
                          <div className='divider'></div>
                          {serviceOrder.childrensSermon === "yes" ? (
                            <h3>Children's Sermon</h3>
                          ) : null}
                          <div className='divider'></div>
                          <h3>Scripture Reading</h3>
                          {serviceOrder &&
                          serviceOrder.scriptureReading &&
                          Object.keys(serviceOrder.scriptureReading).length > 0
                            ? serviceOrder.scriptureReading.passages.map(
                                (verse: any, index: number) => {
                                  return (
                                    <div key={index} dangerouslySetInnerHTML={{ __html: verse }} />
                                  );
                                }
                              )
                            : null}
                          <div className='divider'></div>
                          <h3>Sermon: {serviceOrder.preacher}</h3>
                          <div className='divider'></div>
                          {setCatechism()}
                          <div className='divider'></div>
                          <h2 className='song-title'>Song: {serviceOrder.songThreeTitle}</h2>
                          <div dangerouslySetInnerHTML={{ __html: serviceOrder.songThreeLyrics }} />
                          <div className='divider'></div>
                          <h3>Benediction</h3>
                          {serviceOrder && serviceOrder.benediction
                            ? serviceOrder.benediction.passages.map(
                                (benediction: any, index: number) => {
                                  return (
                                    <div
                                      key={index}
                                      dangerouslySetInnerHTML={{ __html: benediction }}
                                    />
                                  );
                                }
                              )
                            : null}
                        </div>
                        <div className='divider'></div>
                        <div dangerouslySetInnerHTML={{ __html: serviceOrder.miscellaneous }} />
                        <div className='divider'></div>
                      </Tab>
                      <Tab
                        eventKey='announcements'
                        title={
                          <>
                            <i className='fa-solid fa-calendar-days'></i>
                            <div className='tab-text'>Anncmnts.</div>
                          </>
                        }>
                        <>
                          {serviceOrder &&
                          serviceOrder.announcements &&
                          serviceOrder.announcements.length > 0
                            ? serviceOrder.announcements.map((item: any, index: number) => {
                                return (
                                  <>
                                    <div key={index}>
                                      <h3>{item.announcement_title}</h3>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: item.announcement_content,
                                        }}
                                      />
                                      {item.announcement_location ? (
                                        <div>
                                          <strong>Location: </strong>
                                          {item.announcement_location}
                                        </div>
                                      ) : null}
                                      <div className='d-flex'>
                                        {item.announcement_start ? (
                                          <div className='me-3'>
                                            <strong>Begin: </strong>
                                            {item.announcement_start}
                                          </div>
                                        ) : null}
                                        {item.announcement_end ? (
                                          <div className='me-3'>
                                            <strong>End: </strong>
                                            {item.announcement_end}
                                          </div>
                                        ) : null}
                                      </div>
                                    </div>
                                    <div className='divider'></div>
                                  </>
                                );
                              })
                            : null}
                        </>
                      </Tab>
                      <Tab
                        eventKey='prayerRequests'
                        title={
                          <>
                            <i className='fa-solid fa-hands-praying'></i>
                            <div className='tab-text'>Prayer Requests</div>
                          </>
                        }>
                        {serviceOrder &&
                        serviceOrder.prayerRequests &&
                        serviceOrder.prayerRequests.length > 0
                          ? serviceOrder.prayerRequests.map((item: any, index: number) => {
                              return (
                                <>
                                  <div key={index} className='mb-0'>
                                    <h3
                                      style={{ color: "#caac5e", fontSize: "20px" }}
                                      className='mb-0'>
                                      {item.request_type}
                                    </h3>
                                    <h3>{item.name}</h3>
                                    <p>{item.prayer_request}</p>
                                  </div>
                                  <div className='divider'></div>
                                </>
                              );
                            })
                          : null}
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              );
            })}
      </Layout>
    </>
  );
};

export default OrderOfService;

export async function getServerSideProps(context) {
  const response = await fetch("https://hillcitysc.com/wp-json/wp/v2/pages?per_page=50");
  const orderOfServiceResponse = await fetch("https://hillcitysc.com/wp-json/acf/v3/posts/8857");
  const json = await response.json();
  const jsonOrderOfService = await orderOfServiceResponse.json();
  const filter = json.filter((item) => item.id === 8857);
  return {
    props: { data: filter, orderOfService: jsonOrderOfService },
  };
}
