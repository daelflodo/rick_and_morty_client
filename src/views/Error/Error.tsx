import { useNavigate } from 'react-router-dom';
import styles from './Error.module.css';

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.backgroundImg}>
      <div className={styles.space} />
      <div className={styles.wrapper}>
        <div className={styles.imgWrapper}><span>44</span></div>
        <p>
          The page you are trying to search has been<br />moved to another universe.
        </p>
        <button type="button" onClick={() => navigate('/home')}>GET ME HOME</button>
      </div>
    </div>
  );
}
