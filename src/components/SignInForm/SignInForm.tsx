import styles from './SignInForm.module.css';
import { Alert } from '@material-ui/lab';

/* interface ContainerProps { } */

const SignInForm = (props: any) => {
  return (
    <div className={styles.content}>
        <h1 className={styles.welcome}> Bienvenido! </h1>
        <h2 className={styles.descrip} style={{color: "lightgray"}}> Ingrese sus datos </h2>
        <div className={styles.container}>
            <div className={styles['input-container']}>
                <div className={styles.title}>
                    <label className={styles['input-label']}>
                        Correo Electronico
                    </label>
                </div>
                <input 
                    type='email'
                    placeholder='Correo Electrónico'
                    onChange={(event) => props.handleEmail(event.target.value) }
                    value={props.user.email}
                />
            </div>
            <div className={styles['input-container']}>
                <div className={styles.title}>
                    <label className={styles['input-label']}>
                    Contraseña
                    </label>
                </div>
                <input
                    type='password'
                    placeholder='Contraseña'
                    onChange={(event) => props.handlePassword(event.target.value) }
                    value={props.user.password}
                />
            </div>

            <div className={styles['button-container']}>
                <button 
                    className={props.user.email === '' || props.user.password === '' ? `${styles['disabled-button']}` : `${styles.button}` }
                    onClick={props.signIn}
                    disabled={props.user.email === '' || props.user.password === ''}>
                    Iniciar Sesión
                </button>
            </div>

            { (props.error) ? <Alert className={styles.alert} severity="error">{props.errorMsg}</Alert> : null }

        </div>
    </div>
  );
};

export default SignInForm;
