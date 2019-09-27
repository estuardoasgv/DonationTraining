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
                    apiKey: 'RTJ4+E4067P+mqIEizOkGu7nHAxRBfZzkE+/+r1/SbQ=',
                },
                headers: {
                    Authorization: 'Basic dmlhcm86cEBzc3dvcmQ='
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