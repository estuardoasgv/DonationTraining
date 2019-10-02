(function () {
  'use strict';

  angular
    .module('DonationApp')

    .controller('NewDonationController', [NewDonationController])
 

    .component('newDonationComponent', {
      controller: NewDonationController,
      templateUrl: 'js/Components/new-donation/new-donation.html'
    })


  function NewDonationController() { 
    var vm = this; 
  }

})(); 