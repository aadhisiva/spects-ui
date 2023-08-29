import React from 'react'
import styles from "./FooterComponent.module.scss";
import { Image, Layout } from "antd";
import classNames from "classnames";
import { useTranslation } from 'react-i18next';

const { Footer } = Layout;
export const FooterComponent: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={classNames(styles.footerPage, 'footer-page')}>
      <Footer className={styles.footerContainer}>
        <span className={styles.footerText}>{t("FOOTER")}</span>
        <div className={styles.footerImage}>
          <span >{t("DEVELOPED")}</span>
          <Image src={require("../../../assets/Images/footer/m1.png")} preview={false} height={25} width={25} />
          </div>
      </Footer>
    </div>
  )
}
