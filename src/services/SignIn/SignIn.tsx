import axios from 'axios';
import { testhost } from '../../enviroment';

const SignInService = { 

    async SignIn(user: any) {
        user['device'] = 'mobile';
        return new Promise(async (resolve, reject) => {
            const url = `http://${testhost}/api/v1/login`;
            const headers = {
            'x-access-token': ''
            }
            await axios.post(url, user, { headers: headers })
            .then((res) => {
                resolve(res.data)
            })
            .catch((error) => {
                console.log("Errorrr", error);
                reject(error)
            });
        })
        
    }
}

export default SignInService;