import axios from 'axios'

const SignInService = { 

    async SignIn(user: any) {
        return new Promise(async (resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/login'
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