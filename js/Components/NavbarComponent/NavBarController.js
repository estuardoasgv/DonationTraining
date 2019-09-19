(function(){
    'use strict';

    angular
    .module('DonationApp')

    .component('navBar', {
        controller: navBarController,
        templateUrl: 'js/Components/NavbarComponent/navbar.html'
    })

    navBarController.$inject = ['$scope', '$location']; 
    function navBarController($scope, $location) { 

    }
})(); 