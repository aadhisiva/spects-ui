import React from 'react'
import styles from "./FooterComponent.module.scss";
import { Layout } from "antd";
import classNames from "classnames";

const { Footer } = Layout;
export const FooterComponent: React.FC = () => {
  return (
    <div className={classNames(styles.footerPage, 'footer-page')}>
      <Footer className={styles.footerContainer}>
        <span className={styles.footerText}>Government of Karnataka 2023, Center for e-Governance</span>
      </Footer>
    </div>
  )
}
