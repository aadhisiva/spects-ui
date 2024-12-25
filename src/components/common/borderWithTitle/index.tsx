import React, { ReactNode } from 'react'
import "./borderWithTitle.css";
import { CRow } from '@coreui/react';

interface IBorderWithTitle {
    children: ReactNode;
    title: string;
}
export default function BorderWithTitle({children, title}: IBorderWithTitle) {
  return (
    <div className="bordered-box mb-4">
      <span className="border-title">{title ?? "Title"}</span>
        {children}
    </div>
  )
}
