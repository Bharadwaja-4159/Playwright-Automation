const{LandingPage} = require('./LandingPage');
const{DashboardPage} = require('./DashboardPage');
const{PlaceOrder} = require('./PlaceOrder');
const{VerifyOrder} = require('./VerifyOrder');

class POmanager{
    constructor(page){
        this.page = page;
        this.landingPage = new LandingPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.placeOrder = new PlaceOrder(this.page);
        this.verifyOrder = new VerifyOrder(this.page);
    }

getLandingPage(){
    return this.landingPage;
}
getDashboardPage(){
    return this.dashboardPage;
}
getPlaceOrder(){
    return this.placeOrder;
}
getVerifyOrder(){
    return this.verifyOrder;
}
}
module.exports = { POmanager };