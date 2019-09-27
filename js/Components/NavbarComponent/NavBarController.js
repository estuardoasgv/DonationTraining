(function(){
    'use strict';

    angular
    .module('DonationApp')

    .component('navBar', {
        controller: navBarController,
        templateUrl: 'js/Components/NavbarComponent/navbar.html',
        controllerAs: 'vm'
    })

    navBarController.$inject = ['AuthService', '$interval']; 
    function navBarController(AuthService, $interval) { 
        var vm = this;

        vm.Logout = Logout;
        vm.$onInit = onInit; 

        function Logout(){
            AuthService.Logout(); 
        }

        function onInit() {  
            $interval(function(){ AuthService.GetAuthToken(); }, 1000*60*5 )
        } 
        
    }
})(); 