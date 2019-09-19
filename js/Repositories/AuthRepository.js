(function () {

    angular
        .module('DonationApp')
        .factory('AuthRepository', AuthRepository)

    AuthRepository.$inject = ['$http', 'ConstantsApp']

    function AuthRepository($http, ConstantsApp){

        var AuthFactory = {
            AuthApp : AuthApp,
            AuthDonor : AuthDonor
        }

        return AuthFactory;

        function AuthApp() {
            return $http({
                method: 'GET',
                url: 'http://192.168.7.51:3000/api/Application/Authenticate',
                params: {
                    apiKey: ConstantsApp.apiKey,
                },
                headers: {
                    Authorization: `Basic ${ConstantsApp.applicationToken}`
                }
            }).then((res) => {
                return res;
            })
            .catch((err) => {
                console.log(err);
            })
        }
    
        function AuthDonor() {
            return $http({
                method: 'GET',
                url: 'http://192.168.7.51:3000/api/Donor/Authenticate',
                params: { 
                    apiKey: ConstantsApp.apiKey,
                },
                headers: {
                    Authorization: `Bearer ${ConstantsApp.applicationToken}`
                }
            }).then((res) => {
                return res;
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }
})()