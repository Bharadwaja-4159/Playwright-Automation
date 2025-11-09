class APIUtils{
    constructor(apiContext, loginPayload){
        this.apiContext = apiContext
        this.loginPayload = loginPayload
    }
    async getToken(){
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data:this.loginPayload,
                //use below key if you get following error "apiRequestContext.post: unable to get local issuer certificate"
                ignoreHTTPSErrors: true
            }
        )
        //expect(loginResponse.ok()).toBeTruthy();
        //to get response in json format
        const loginResponseJson = await loginResponse.json();
        //to get token details
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }

    async createOrder(orderPayload){
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers:{
                    'authorization': response.token,
                    'content-type': 'application/json'
                },
                ignoreHTTPSErrors: true
            })
            const orderResponseJson = await orderResponse.json();
            console.log("orderResponseJson = "+orderResponseJson);
            const orderId = orderResponseJson.orders[0];
            response.orderId = orderId;
            console.log("APIUtils OrderId: "+response.orderId);
            return response;
    }
}
module.exports = {APIUtils}; //this make the class visible for all the files in the project