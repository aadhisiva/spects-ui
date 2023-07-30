import styles from "./Loader.module.scss";
import classNames from 'classnames';

export default function Loader() {
  return (
    <div className={classNames(styles.pageLoader, 'loader-page')}>
      <div className={styles.container}>    
        <div className={styles.ring}></div>
        <div className={styles.ring}></div>
        <div className={styles.ring}></div>
      </div>
    </div>
  )
};
