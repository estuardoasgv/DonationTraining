(function(){

    angular
        .module('DonationApp')
        .factory('PaymentRepository', PaymentRepository)

        PaymentRepository.$inject = ['$http', 'ConstantsApp'];

        function PaymentRepository($http, ConstantsApp){

            var PaymentFactory = {
                GetPaymentConfig : GetPaymentConfig,
                GetCountries : GetCountries,
                GetStates : GetStates,
                GetCharities : GetCharities,
                GetDonations : GetDonations,
                SaveDonation : SaveDonation
            }

            function GetPaymentConfig(){ 
                return $http({
                    method: 'GET',
                    url: `${ConstantsApp.api}Configuration/PaymentTypeConfiguration`,
                    params: {
                        paymentType: 2,
                        donorToken: ConstantsApp.donorToken,
                        apiKey: ConstantsApp.apiKey,
                    },
                    headers: {
                        Authorization: `Bearer ${ConstantsApp.applicationToken}`
                    }
                }).then((res) => {
                    return res;
                })
                .catch((err) => {
                    throw `Error with Payment Configuration ${JSON.stringify(err)}`;
                })
            }

            function GetCountries(){
                return $http({
                    method: 'GET',
                    url: `${ConstantsApp.api}Configuration/Countries`,
                    params: { 
                        apiKey: ConstantsApp.apiKey
                    },
                    headers: {
                        Authorization: `Bearer ${ConstantsApp.applicationToken}`
                    }
                }).then((res) => {
                    return res;
                })
                .catch((err) => {
                    throw `Error with Countries ${JSON.stringify(err)}`;
                })
            }

            function GetStates(){
                return $http({
                    method: 'GET',
                    url: `${ConstantsApp.api}Configuration/USStates`,
                    params: { 
                        apiKey: ConstantsApp.apiKey
                    },
                    headers: {
                        Authorization: `Bearer ${ConstantsApp.applicationToken}`
                    }
                }).then((res) => {
                    return res;
                })
                .catch((err) => {
                    throw `Error with States ${JSON.stringify(err)}`;
                })
            }

            function GetCharities() {

                return $http({
                    method: 'GET',
                    url: `${ConstantsApp.api}Configuration/IntroductoryPanel`,
                    params: {
                        apiKey : ConstantsApp.apiKey,
                        donorToken: ConstantsApp.donorToken,
                    },
                    headers: {
                        Authorization: `Bearer ${ConstantsApp.applicationToken}`
                    } 
                })
                .then((res) => {
                    return res;
                })
                .catch((err) => {
                    throw `Error with Charities ${JSON.stringify(err)}`;
                })
            }

            function GetDonations(pageNumber) {

                return $http({
                    method: 'GET',
                    url: `${ConstantsApp.api}Donor/GivingHistory`,
                    params: {
                        apiKey: ConstantsApp.apiKey,
                        donorToken: ConstantsApp.donorToken,
                        page: pageNumber
                    },
                    headers: {
                        Authorization: `Bearer ${ConstantsApp.applicationToken}`
                    } 
                })
                .then((res) => {
                    return res.data;
                })
                .catch((err) => {
                    throw `Error with Donations list ${JSON.stringify(err)}`; 
                })

            }

            function SaveDonation(pledge, ipAddress) {

                return $http({
                    method: 'POST',
                    url:  `${ConstantsApp.api}Donation/Save`,
                    params: {
                        donorToken: ConstantsApp.donorToken,
                        ipAddress: ipAddress, 
                        apiKey: ConstantsApp.apiKey, 
                    },
                    data: pledge,
                    headers: {
                        Authorization: `Bearer ${ConstantsApp.applicationToken}`,
                        Accept: 'application/json'
                    } 
                })
                .then((res) => {
                    return res.data;
                })
                .catch((err) => {
                    throw `Error with Donation save ${JSON.stringify(err)}`;
                })


            }

            return PaymentFactory;
        }
})()