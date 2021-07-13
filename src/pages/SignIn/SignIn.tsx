import React from 'react';
import { Redirect } from 'react-router-dom';
import styles from './SignIn.module.css';
import { IonContent, IonPage } from '@ionic/react';
import SignInService from '../../services/SignIn/SignIn';
import SignInForm from '../../components/SignInForm/SignInForm';

interface IProps {
    history: any
};

interface IState { 
    user?: any,
    error: boolean,
    errorMsg: string
};

class SignIn extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    
        this.state = {
            user: {
                email: '',
                password: ''
            },
            error: false,
            errorMsg: ''
        };
    }

    handleEmail = (email: string) => {
        this.setState((prevState) => {
            let user = Object.assign({}, prevState.user);
            user.email = email;
            return { user };
        })
    }
  
    handlePassword = (password: string) => {
        this.setState((prevState) => {
            let user = Object.assign({}, prevState.user);
            user.password = password;
            return { user };
        })
    }

    signIn = async () => {
        let user: any = await SignInService.SignIn(this.state.user).catch((res) => this.setState({ error: true, errorMsg: res.data.error }))
        if (user) {
          this.setState({ error: false })
          await localStorage.setItem('token', user.token)
          await localStorage.setItem('user', JSON.stringify(user.user))
          await this.props.history.push('/products')
        };
    }

    render = () => {
        return (
            <IonPage>
            <IonContent fullscreen className={styles.page}>
                <div className={styles.form}>
                    <SignInForm user={this.state.user} error={this.state.error} errorMsg={this.state.errorMsg} handleEmail={this.handleEmail} handlePassword={this.handlePassword} signIn={this.signIn} />
                </div>
            </IonContent>
            </IonPage>
        )
    };
};

export default SignIn;
