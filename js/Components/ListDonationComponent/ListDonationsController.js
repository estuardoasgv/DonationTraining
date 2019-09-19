(function(){
    'use strict';

    angular
        .module('DonationApp')
        .controller('ListDonationController', [ListDonationController])

        .component('listDonationComponent', {
            controller: ListDonationController,
            templateUrl: 'js/Components/ListDonationComponent/ListDonation.html'
        })

        ListDonationController.$inject = ['$cookies'];

        function ListDonationController($cookies){

        }
})();