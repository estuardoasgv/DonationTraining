(function(){
    'use strict';

    angular
    .module('DonationApp')

    .component('navBar', {
        controller: navBarController,
        templateUrl: 'js/Components/NavbarComponent/navbar.html',
        controllerAs: 'vm'
    })

    navBarController.$inject = ['AuthService']; 
    function navBarController(AuthService) { 
        var vm = this;

        vm.Logout = Logout;

        function Logout(){
            AuthService.Logout(); 
        }
        
    }
})(); 