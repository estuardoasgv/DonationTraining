(function () {
    'use strict';

    angular
        .module('DonationApp')
        .service('AuthService', AuthService)

    AuthService.$inject = ['AuthRepository', '$state', '$cookies', 'ConstantsApp']

    function AuthService(AuthRepository, $state, $cookies, ConstantsApp) {

        var service = this;
        service.GetAuthToken = GetAuthToken;
        
        function GetAuthToken() {
            AuthRepository.AuthApp()
                .then((res) => {
                    $cookies.put('applicationToken', res.data);
                    ConstantsApp.applicationToken = $cookies.get('applicationToken');
                    //console.log(res);
                })
                .catch((err) => {
                    return err;
                })
        }
    }



})();