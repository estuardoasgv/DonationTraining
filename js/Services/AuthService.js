(function () {
    'use strict';

    angular
        .module('DonationApp')
        .service('AuthService', AuthService)

    AuthService.$inject = ['AuthRepository', '$state', '$cookies', 'ConstantsApp']

    function AuthService(AuthRepository, $state, $cookies, ConstantsApp) {

        var service = this;
        service.GetAuthToken = GetAuthToken;
        service.AuthDonor = AuthDonor;
        service.Logout = Logout;
        service.IsLogued = IsLogued;

        
        function GetAuthToken() {
            AuthRepository.AuthApp()
                .then((res) => {
                    $cookies.put('applicationToken', res.data);
                    ConstantsApp.applicationToken = $cookies.get('applicationToken');
                    console.log(res);
                })
                .catch((err) => {
                    return err;
                })
        }

        function AuthDonor(userData){
            return AuthRepository.AuthDonor(userData)
                .then((res) => {
                    $cookies.put('donorToken', res.data.Data.DonorToken); 
                    ConstantsApp.donorToken = $cookies.get('donorToken');
                    console.log($cookies.get('donorToken'));
                    return res
                })
                .catch((err) => { 
                    throw new Error(err);
                })
        }

        function Logout(){
            $cookies.remove('applicationToken');
            $cookies.remove('donorToken');
            ConstantsApp.applicationToken = 'dmlhcm86cEBzc3dvcmQ=',
            ConstantsApp.donorToken = null,
            $state.go('login');
        }

        function IsLogued(){
            if( $cookies.get('applicationToken') && $cookies.get('donorToken')){
                ConstantsApp.applicationToken = $cookies.get('applicationToken');
                ConstantsApp.donorToken = $cookies.get('donorToken');
                return true;
            } else {
                Logout();
                return  false;
            }
        }
    }



})();