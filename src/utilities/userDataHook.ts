import { useState, useEffect, Dispatch } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IStateValues } from "../type";
import { useNavigate } from "react-router";
// import { getMe } from "../redux/features/authSlice";

export const useFetchUserData = () => {
  // session user Data
  // const [userData] = useFetchUserData();

  const userStore: any = useSelector((state: IStateValues) => state?.auth);
  const { isError, user } = userStore;

  //redux session
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate("/signin");
    }
  }, [navigate]);

  return [user];
};
