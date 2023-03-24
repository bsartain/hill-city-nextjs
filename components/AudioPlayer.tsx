import { useContext } from "react";
import { Store } from "context/context";
import ReactAudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { formatDate } from "utils";
import "react-h5-audio-player/lib/styles.css";

function AudioPlayer() {
  const { singleSermon, openMediaDrawer, setOpenMediaDrawer } = useContext(Store);
  return (
    <div>
      {openMediaDrawer && singleSermon.length > 0
        ? singleSermon.map((sermon: any, index: number) => {
            return (
              <footer className='audio-player-container' key={index}>
                <div className='audio-image-content'>
                  <div
                    style={{
                      backgroundImage: `url(${sermon.featured_image.large})`,
                    }}
                    className='audio-player-image'></div>
                  <div className='audio-content'>
                    <div className='d-flex'>
                      <div>
                        <i
                          className='fa-sharp fa-solid fa-circle-xmark'
                          onClick={() => setOpenMediaDrawer(false)}></i>
                        <div className='sermon-date'>{formatDate(sermon.date)}</div>
                        <div className='sermon-title'>{sermon.title}</div>
                        <div className='sermon-preacher'>
                          {sermon.preacher.map((preacher) => preacher.name)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <ReactAudioPlayer
                  className='media-player'
                  src={sermon.sermon_audio}
                  autoPlay={true}
                  autoPlayAfterSrcChange={true}
                  listenInterval={1000}
                  progressJumpStep={5000}
                  volumeJumpStep={0.1}
                  preload={"auto"}
                  progressUpdateInterval={20}
                  volume={1}
                  showJumpControls={true}
                  showSkipControls={false}
                  showDownloadProgress={true}
                  showFilledProgress={true}
                  customIcons={{
                    rewind: <i className='fa-solid fa-rotate-left'></i>,
                    forward: <i className='fa-solid fa-rotate-right'></i>,
                    play: <i className='fa-solid fa-circle-play'></i>,
                    pause: <i className='fa-solid fa-circle-pause'></i>,
                  }}
                  customProgressBarSection={[
                    RHAP_UI.PROGRESS_BAR,
                    RHAP_UI.CURRENT_TIME,
                    <div className='media-player-time-divider'>/</div>,
                    RHAP_UI.DURATION,
                  ]}
                  customControlsSection={[RHAP_UI.MAIN_CONTROLS, RHAP_UI.VOLUME_CONTROLS]}
                  customVolumeControls={[RHAP_UI.VOLUME]}
                  layout={"horizontal-reverse"}
                />
                <i
                  className='fa-sharp fa-solid fa-circle-xmark audio-container-close-button'
                  onClick={() => setOpenMediaDrawer(false)}></i>
              </footer>
            );
          })
        : null}
    </div>
  );
}

export default AudioPlayer;
