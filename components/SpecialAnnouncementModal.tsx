import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

interface SpecialAnnouncementModel {
  special_announcement: string;
}

const SpecialAnnouncementModal = () => {
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [specialAnnouncement, setSpecialAnnouncement] = useState({} as SpecialAnnouncementModel);

  useEffect(() => {
    const sessionStorageValue = window.sessionStorage.getItem("clickedSpecialAnnouncementModal");
    const fetchSpecialAnnouncementData = async () => {
      const response: any = await fetch("https://hillcitysc.com/wp-json/acf/v3/posts/8857");
      const json = await response.json();
      setSpecialAnnouncement(json.acf);
      if (json.acf.special_announcement && !sessionStorageValue) {
        setShowAnnouncementModal(true);
      }
    };
    fetchSpecialAnnouncementData();
  }, []);

  const handleSessionStorage = () => {
    window.sessionStorage.setItem("clickedSpecialAnnouncementModal", String(true));
  };

  return (
    <Modal
      show={showAnnouncementModal}
      onHide={() => {
        setShowAnnouncementModal(false);
        handleSessionStorage();
      }}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h4 className='mt-3'>Special Announcement</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {specialAnnouncement?.special_announcement ? (
          <div className='p-2' dangerouslySetInnerHTML={{ __html: specialAnnouncement.special_announcement }} />
        ) : null}
      </Modal.Body>
    </Modal>
  );
};

export default SpecialAnnouncementModal;
