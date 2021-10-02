import React, { useState } from 'react';
import rickRoll from './assets/rickroll.gif';
import rickRollMP3 from './assets/rickrollmp3.mp3';
import styles from './notfound.module.scss';

type NotfoundProps = {

}


const Notfound: React.FC<NotfoundProps> = () => {
  const playAudio = () => {
    const audioEl = document.getElementsByClassName("audio-element")[0] as HTMLAudioElement
    audioEl.play();
  }

  const [appear, setAppear] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <audio className="audio-element">
        <source src={rickRollMP3}></source>
      </audio>
      <h1 style={{fontSize: '80px', textAlign:'center', margin: '0'}}>OOPS... 404</h1>
      <p style={{textAlign: 'center'}}>the page you tried to retrieve does not exist</p>
      <h2 style={{textAlign: 'center'}}>But still, you found something <button className={styles.shakeButton} onClick={() => {
        playAudio();
        setAppear(true);
      }}><h2>Cool</h2></button></h2>

      {
        appear
          ? (
            <>
              <div>
                <img className={styles.rickroll} src={rickRoll} alt="YOU'VE BEEN RICKROLLED" />
                <h1 className={styles.message}>YOU'VE HAVE BEEN RICK ROLLED</h1>
              </div>
            </>
            )
          : null
      }
    </div>
  )
}

export default Notfound
