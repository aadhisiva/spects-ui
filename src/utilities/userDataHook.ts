import { useState, useEffect } from "react";
import { sessionService } from "redux-react-session";

type TuseFetchUserDataProps = {
    name: string,
    token?: string,
    unique_id?: string,
    user_unique_id?: string
}
export const useFetchUserData = () => {
  const [sessionUserData, setSessionUserData] = useState<TuseFetchUserDataProps>();

  useEffect(() => {
    sessionService.loadUser()
      .then((currentUser) => setSessionUserData(currentUser));
  }, []);

  return [sessionUserData];
};
