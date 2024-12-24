import React from 'react'
import { useSelector } from 'react-redux';

export default function userSelectedValue() {
  const userData = useSelector((state: any) => state.user);
  return [userData];
}
