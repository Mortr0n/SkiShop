import axios, { AxiosError, AxiosResponse } from "axios";
import { request } from "http";
import { toast } from "react-toastify";
import { history } from "../..";


const sleep = () => new Promise(resolve => setTimeout(resolve, 600));

// Setting up default baseURL for calls
axios.defaults.baseURL = 'http://localhost:5000/api/';
// adding the ability to attach credentials for cookies
axios.defaults.withCredentials = true;

// setting response.data to the variable responseBody
const responseBody = (response: AxiosResponse) => response.data;

// for intercepting the response from axios in order to handle possible errors.
axios.interceptors.response.use(async response => {
    await sleep();
    return response
}, (error: AxiosError) => {
    // initial console log to see what happens when interceptor catches an error.
    // console.log('Caught by interceptor');
    // destructuring data and status from the error response in order to use them in a toast
    // we learned to use an ! after response to ignore the type scripting, but then it caused another issue on data.title lines later. 
    // So I used @ts-ignore instead
    //@ts-ignore 
    const { data, status} = error.response;
    switch (status) {
        case 400:
            if(data.errors){
                const modelStateErrors: string[] = [];
                for(const key in data.errors) {
                    if(data.errors[key]){
                        modelStateErrors.push(data.errors[key]);
                    }
                }
                throw modelStateErrors.flat();
            }
            //@ts-ignore
            toast.error(data.title);
            break;
        case 401: 
        //@ts-ignore
            toast.error(data.title);
            break;
        case 500:
            history.push({
                pathname: '/server-error',
                state: {error: data}
            });
            break;
        
        default: 
            break;
    }
    // need to return something in order to keep from crashing the app
    return Promise.reject(error.response);
})

const requests = {
    // Take in a url, and possibly body object and then perform axios calls
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    // take the baseURL with get append products to it
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`),
}

const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request'), 
    get401Error: () => requests.get('buggy/unauthorized'), 
    get404Error: () => requests.get('buggy/not-found'), 
    get500Error: () => requests.get('buggy/server-error'), 
    getValidationError: () => requests.get('buggy/validation-error'), 
}

const Basket = {
    get: () => requests.get('basket'),
    addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
    
}

const agent = {
    Catalog,
    TestErrors,
    Basket
}



export default agent;