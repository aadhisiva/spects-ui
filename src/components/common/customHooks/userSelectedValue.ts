import React from 'react'
import { useSelector } from 'react-redux';
import { CounterState } from '../../../pages/redux/features/userReducer';

interface IuserSelectedValue{
  user: CounterState;
}
export default function userSelectedValue() {
  const userData = useSelector((state: IuserSelectedValue) => state.user);
  return [userData];
}
