import React, { useRef, useState } from "react";
import IdelTimer from "react-idle-timer";
import { SESSION_TIME_OUT } from "../../../utilities";
import {
  Modal,
  Button,
  Typography,
} from "antd"
let countdownInterval: any;
let timeout: any;

type SessionTimeout = {
  isAuthenticated: boolean
  logOut: () => void
}

export const SessionTimeout: React.FC<SessionTimeout> = ({ isAuthenticated, logOut }) => {
  const [timeoutModalOpen, setTimeoutModalOpen] = useState(false);
  const [timeoutCountdown, setTimeoutCountdown] = useState(0);
  const idleTimer = useRef(null);

  const clearSessionTimeout = () => {
    clearTimeout(timeout);
  };

  const clearTimeDownInterval = () => {
    clearInterval(countdownInterval);
  };

  const handlePopUpClose = async (isTimedOut = false) => {
    try {
      setTimeoutModalOpen(false);
      clearTimeDownInterval();
      clearSessionTimeout();
      logOut();
    } catch (err) {
      console.error(err);
    }
  };

  const onActive = () => {
    if (!timeoutModalOpen) {
      clearTimeDownInterval();
      clearSessionTimeout();
    }
  };

  const onIdle = () => {
    const delay = 1000 * 1;
    if (isAuthenticated && !timeoutModalOpen) {
      timeout = setTimeout(() => {
        let countDown = 10;
        setTimeoutModalOpen(true);
        setTimeoutCountdown(countDown);
        countdownInterval = setInterval(() => {
          if (countDown > 0) {
            setTimeoutCountdown(--countDown);
          } else {
            handlePopUpClose(true);
          }
        }, 1000);
      }, delay);
    }
  };
  const handleContinue = () => {
    setTimeoutModalOpen(false);
    clearTimeDownInterval();
    clearSessionTimeout();
  };
  console.log("##timeoutModalOpen", timeoutModalOpen);
  return (
    <>
      <IdelTimer
        ref={idleTimer}
        onActive={onActive}
        onIdle={onIdle}
        debounce={250}
        timeout={SESSION_TIME_OUT}
      />
      <Modal
        open={timeoutModalOpen}
        title="Title"
        onCancel={() => handlePopUpClose(false)}
        footer={[
          <Button
            onClick={() => {
              setTimeoutModalOpen(false);
              clearTimeDownInterval();
              clearSessionTimeout();
              logOut()
            }}
          >
            Logout
          </Button>,
          <Button
            color="primary"
            onClick={handleContinue}
          >
            Continue Session
          </Button>
        ]}
      >
        <Typography>
          The current session is about to expire in {" "}
          <span className={""}>{timeoutCountdown}</span> seconds.
        </Typography>
        <Typography>{`Would you like to continue the session?`}</Typography>
      </Modal>
    </>
  );
}
