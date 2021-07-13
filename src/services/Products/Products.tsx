import axios from 'axios';
import { testhost } from '../../enviroment';

const ProductService = { 

    async fetchProduct() {
        return new Promise(async (resolve, reject) => {
            const url = `http://${testhost}/api/v1/products`;
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.get(url, { headers: headers })
            .then((res) => {
                resolve(res.data)
            })
            .catch((error) => {
                console.log("Errorrr", error);
                reject(error)
            });
        })
    },

    async lastExchange() {
        return new Promise(async (resolve, reject) => {
            const url = `http://${testhost}/api/v1/exchanges/last`;
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.get(url, { headers: headers })
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

export default ProductService;