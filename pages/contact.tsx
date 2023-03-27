import { useState } from "react";
import Layout from "components/Layout";
import Header from "components/Header";
import { useRouter } from "next/router";
import { Spinner, Alert } from "react-bootstrap";

const Contact = ({ data, mapAndTimes }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [spinner, setSpinner] = useState(false);
  const [alert, setAlert] = useState({
    success: false,
    failed: false,
  });
  const router = useRouter();

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
      setForm({ ...form, name: "", email: "", subject: "", message: "" });
    } else {
      setAlert({ ...alert, failed: true });
      setTimeout(() => {
        setAlert({ ...alert, failed: false });
      }, 5000);
    }
  };

  return (
    <Layout title='Contact/Service Times' meta={data[0]}>
      {!data
        ? "Loading..."
        : data.map((item: any, index: number) => {
            return (
              <span key={index}>
                <span>
                  <Header data={data} router={router} />
                  <div className='container mt-5' key={index}>
                    <h1>{item.title.rendered}</h1>
                    <div dangerouslySetInnerHTML={{ __html: item.content.rendered }}></div>
                  </div>
                  <form onSubmit={handleSubmit} className='container mt-5'>
                    <div className='form-floating mb-2'>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Name'
                        name='name'
                        value={form.name ? form.name : ""}
                        onChange={(e: any) => setForm({ ...form, name: e.target.value })}
                      />
                      <label htmlFor='name'>Name</label>
                    </div>
                    <div className='form-floating mb-2'>
                      <input
                        type='email'
                        className='form-control'
                        placeholder='Email'
                        value={form.email ? form.email : ""}
                        name='email'
                        onChange={(e: any) => setForm({ ...form, email: e.target.value })}
                      />
                      <label htmlFor='email'>Email</label>
                    </div>
                    <div className='form-floating mb-2'>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Subject'
                        name='subject'
                        value={form.subject ? form.subject : ""}
                        onChange={(e: any) => setForm({ ...form, subject: e.target.value })}
                      />
                      <label htmlFor='subject'>Subject</label>
                    </div>
                    <div className='form-floating'>
                      <textarea
                        className='form-control'
                        placeholder='Leave a comment here'
                        id='message'
                        style={{ height: "100px" }}
                        name='message'
                        value={form.message ? form.message : ""}
                        onChange={(e: any) =>
                          setForm({ ...form, message: e.target.value })
                        }></textarea>
                      <label htmlFor='floatingTextarea'>Message</label>
                    </div>
                    <div className='d-flex align-items-start'>
                      <button type='submit' className='btn btn-primary mt-3 me-2'>
                        Submit
                      </button>
                      {spinner ? <Spinner animation='border' className='mt-3' /> : null}
                      {alert.success ? (
                        <Alert key={"success"} variant={"success"} className='mt-3'>
                          Your message was sent successfully. One of our Elders will review promptly
                          and get back to you. God bless.
                        </Alert>
                      ) : null}
                      {alert.failed ? (
                        <Alert key={"danger"} variant={"danger"} className='mt-3'>
                          Your message did not send. Please check the information and try again.
                        </Alert>
                      ) : null}
                    </div>
                  </form>
                  {!mapAndTimes
                    ? null
                    : mapAndTimes.map((item: any, index: number) => {
                        return (
                          <div className='d-flex service-times-details' key={index}>
                            <div className='service-times'>
                              <div
                                dangerouslySetInnerHTML={{ __html: item.acf.footer_content }}></div>
                            </div>
                            <iframe
                              src={item.acf.footer_map}
                              width='100%'
                              height='600px'
                              frameBorder='0'
                              title='Hill City Church Map'
                              style={{ border: "0px" }}></iframe>
                          </div>
                        );
                      })}
                </span>
              </span>
            );
          })}
    </Layout>
  );
};

export default Contact;

export async function getServerSideProps(context) {
  const response = await fetch("https://hillcitysc.com/wp-json/wp/v2/pages?per_page=50");
  const json = await response.json();
  const filter = json.filter((item) => item.id === 41);
  const mapAndTimes = json.filter((item) => item.id === 9262);
  return {
    props: { data: filter, mapAndTimes: mapAndTimes },
  };
}
