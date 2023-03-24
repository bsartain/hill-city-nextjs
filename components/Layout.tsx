import React, { ReactNode, useState, useEffect, useContext } from "react";
import { Store } from "context/context";
import Link from "next/link";
import Head from "next/head";
import { Container, OverlayTrigger, Popover } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useRouter } from "next/router";
import { HexColorPicker } from "react-colorful";

type Props = {
  children?: ReactNode;
  title?: string;
  meta?: any;
};

function Layout({ children, title, meta }: Props) {
  const [show, setShow] = useState(false);
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [fontIconColor, setFontIconColor] = useState({ color: "#ffffff" });
  const [fontColor, setFontColor] = useState("#737373");
  const [mobileWindow, setMobileWindow] = useState(true);
  const [logo, setLogo] = React.useState(
    "https://hillcitysc.com/wp-content/uploads/2021/02/HC-masthead-logo-white.png"
  );
  const { liveStreamPageStyles, setLiveStreamPageStyles } = useContext(Store);
  const router = useRouter();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const updateNavbarColor = () => {
      if (document.documentElement.scrollTop > 399 || document.body.scrollTop > 399) {
        setNavbarColor("navbar-white");
        setLogo("https://hillcitysc.com/wp-content/uploads/2019/10/HC-masthead-logo.png");
        setFontIconColor({ ...fontIconColor, color: "#323232" });
      } else if (document.documentElement.scrollTop < 400 || document.body.scrollTop < 400) {
        setNavbarColor("navbar-transparent");
        setLogo("https://hillcitysc.com/wp-content/uploads/2021/02/HC-masthead-logo-white.png");
        setFontIconColor({ ...fontIconColor, color: "#ffffff" });
      }
    };

    const checkMobileView = () => {
      if (window.innerWidth < 550) {
        setMobileWindow(true);
      } else {
        setMobileWindow(false);
      }
    };
    checkMobileView();
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });

  const stripHtml = (string: string) => {
    const strippedHtml = string.replace(/<\/?[^>]+(>|$)/g, "").replace(/\[.*?\]/g, "");
    return strippedHtml;
  };

  return (
    <div className='layout-container'>
      <Head>
        <title>{`Hill City Church | ${title}`}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5'></link>
        <meta charSet='utf-8' />
        <meta
          property='og:title'
          content={`${meta.title.rendered ? meta.title.rendered : meta.title}`}
        />
        <meta
          property='og:description'
          content={stripHtml(
            meta.excerpt
              ? meta.excerpt.rendered
              : `${meta.preacher[0].name} | ${meta.sermon_series[0].name}`
          )}
        />
        <meta
          property='og:image'
          content={
            meta && meta.better_featured_image && meta.better_featured_image.media_details
              ? meta.better_featured_image.media_details.sizes.medium.source_url
              : meta.featured_image.large
          }
        />
        <meta property='og:url' content={`https://hillcitysc.com${router.pathname}`} />
        <meta property='fb:app_id' content='1004092133118810' />
        <meta
          name='twitter:title'
          content={`Hill City Church | ${meta.excerpt ? meta.excerpt.rendered : meta.title}`}
        />
        <meta
          name='twitter:description'
          content={stripHtml(
            meta.excerpt
              ? meta.excerpt.rendered
              : `${meta.preacher[0].name} | ${meta.sermon_series[0].name}`
          )}
        />
        <meta
          name='twitter:image'
          content={
            meta && meta.better_featured_image && meta.better_featured_image.media_details
              ? meta.better_featured_image.media_details.sizes.medium.source_url
              : meta.featured_image.large
          }
        />
        <meta name='twitter:card' content='https://hillcitysc.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com'></link>
        <script src='https://js.churchcenter.com/modal/v1'></script>
      </Head>
      <header>
        <Navbar className={"fixed-top " + navbarColor}>
          <Container>
            <Navbar.Brand href='#home'>
              <h6 className='mt-2'>
                <img src={logo} className='nav-logo ms-2' />
              </h6>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className='justify-content-end'>
              <Navbar.Text>
                {router.pathname === "/live-stream" && mobileWindow ? (
                  <OverlayTrigger
                    trigger='click'
                    key={"bottom"}
                    placement={"bottom"}
                    rootClose
                    overlay={
                      <Popover
                        id={`popover-positioned-${"bottom"}`}
                        className='font-adajust-popover'>
                        <Popover.Body>
                          <h3 className='font-adjust-header'>Adjust Font</h3>
                          <div className='font-adjust-buttons'>
                            <div
                              className='small-a'
                              onClick={() =>
                                setLiveStreamPageStyles({
                                  ...liveStreamPageStyles,
                                  fontSize: liveStreamPageStyles.fontSize - 1,
                                })
                              }>
                              A
                            </div>
                            <div
                              className='big-a'
                              onClick={() =>
                                setLiveStreamPageStyles({
                                  ...liveStreamPageStyles,
                                  fontSize: liveStreamPageStyles.fontSize + 1,
                                })
                              }>
                              A
                            </div>
                          </div>
                          <HexColorPicker
                            color={fontColor}
                            onChange={(e: any) =>
                              setLiveStreamPageStyles({ ...liveStreamPageStyles, color: e })
                            }
                          />
                          <div className='screen-mode-container'>
                            <div
                              className='dark-mode-icon'
                              onClick={() =>
                                setLiveStreamPageStyles({
                                  ...liveStreamPageStyles,
                                  background: "#323232",
                                })
                              }>
                              <i className='fa-solid fa-memo'></i>
                            </div>
                            <div
                              className='light-mode-icon'
                              onClick={() =>
                                setLiveStreamPageStyles({ ...liveStreamPageStyles, background: "" })
                              }>
                              <i className='fa-regular fa-memo'></i>
                            </div>
                          </div>
                          <div className='d-grid gap-2'>
                            <button
                              className='btn btn-primary reset-button'
                              type='button'
                              onClick={() =>
                                setLiveStreamPageStyles({
                                  ...liveStreamPageStyles,
                                  background: "",
                                  color: "#737373",
                                  fontSize: 16,
                                })
                              }>
                              RESET
                            </button>
                          </div>
                        </Popover.Body>
                      </Popover>
                    }>
                    <i className='fa-light fa-font-case' style={fontIconColor}></i>
                  </OverlayTrigger>
                ) : null}
                <i className='fa-solid fa-bars me-2' onClick={() => handleShow()}></i>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      {children}
      <footer className='footer-container'>
        <div className='footer-content-container'>
          <div>
            <h1>Gatherings</h1>
            <h3>Sunday Morning</h3>
            <p>10:00am</p>
            <h3 className='mt-3'>Address</h3>
            <p>
              Gettys Art Center
              <br />
              201 E Main St, Rock Hill, SC 29730
            </p>
          </div>
          <div>
            <h1>Map</h1>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13085.028651345927!2d-81.0256805!3d34.9250869!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x64f7a6109e565477!2sTom%20S.%20Gettys%20Art%20Center!5e0!3m2!1sen!2sus!4v1654546755146!5m2!1sen!2sus'
              width='100%'
              frameBorder='0'
              style={{ border: "0px" }}></iframe>
          </div>
        </div>
      </footer>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement='end'
        className='offcanvas-menu-container'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <img src='/images/HC-masthead-logo-white.png' />
          <div className='nav-links'>
            <div>
              <Link href='/'>Home</Link>
            </div>
            <div>
              <Link href='/gospel'>The Gospel</Link>
            </div>
            <div>
              <Link href='/about'>About</Link>
            </div>
            <div>
              <Link href='/faith'>Our Faith</Link>
            </div>
            <div>
              <Link href='/sermons'>Sermons</Link>
            </div>
            <div>
              <Link href='/live-stream'>Live Stream</Link>
            </div>
            <div>
              <Link href='/devotional'>Devotional</Link>
            </div>
            <div>
              <Link href='/contact'>Service Times/Contact</Link>
            </div>
            <div>
              <Link href='/small-groups'>Small Groups</Link>
            </div>
            <div>
              <Link href='/give'>Give</Link>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Layout;
