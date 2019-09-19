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
                url: `${ConstantsApp.api}Application/Authenticate`,
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
    
        function AuthDonor(userData) {
            return $http({
                method: 'GET',
                url: `${ConstantsApp.api}Donor/Authenticate`,
                params: { 
                    ...userData,
                    apiKey: ConstantsApp.apiKey,
                },
                headers: {
                    Authorization: `Bearer ${ConstantsApp.applicationToken}`
                }
            }).then((res) => { 
                if(res.data.Errors){ 
                    throw new Error(res);
                } else {
                    return res;
                } 
            }) 
        }
    }
})()