import React, { useEffect, useState } from "react";

type TimingsShow ={
    isLogin: boolean,
    styles: any,
    setSecondsDup: any
    setMinutesDup: any
}

export const TimingsShow:React.FC<TimingsShow> = ({isLogin, styles, setSecondsDup,
    setMinutesDup}) => {
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(60);

    useEffect(() => {
        if (isLogin) {
          const interval = setInterval(() => {
            if (seconds > 0) {
              setSeconds(seconds - 1);
              setSecondsDup(seconds - 1);
            }
    
            if (seconds === 0) {
              if (minutes === 0) {
                clearInterval(interval);
              } else {
                setSeconds(59);
                setSecondsDup(59);
                setMinutes(minutes - 1);
                setMinutesDup(minutes - 1);
              }
            }
          }, 1000);
          return () => {
            clearInterval(interval);
          };
        }
      }, [seconds, isLogin]);
    return (
        <>
        {seconds > 0 || minutes > 0 ? (
            <> :
              <span className={styles.timer}>
                {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </span>
            </>
          ) : ("")}
          </>
    )
}