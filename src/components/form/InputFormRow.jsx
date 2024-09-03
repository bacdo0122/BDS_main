import { Link } from 'react-router-dom';
import styles from './ifr.module.scss'

export default function InputFormRow({
    labelName,
    name,
    value,
    handleOnChange,
    type = 'text',
    validationError,
    dataTestId,
    typePage
}) {
    return (
        <>
        <article className={styles.inputBox}>
            <label>{labelName}</label>
            <input type={type} name={name} value={value || ''} onChange={handleOnChange} data-testid={dataTestId} />
            {validationError && <p className={styles.validationError} data-testid={`valerror-${dataTestId}`} data-tooltip={validationError}></p>}
        </article>
        {(name === 'password' && typePage !== 'FORGOTPASSWORD_FIELDS' && typePage !== 'SignUp_FIELDS') && 
      <>
 
             <div className={styles.forgotPassword}> Chưa có tài khoản? 
             <Link to="/signup" style={{marginLeft: '10px', color: "#fff"}}>Đăng ký</Link>
             </div>
      </>
              }
            </>
    );
}
