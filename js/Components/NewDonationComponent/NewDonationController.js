(function () {
  'use strict';

  angular
    .module('DonationApp')

    .controller('NewDonationController', [NewDonationController])
 

    .component('newDonationComponent', {
      controller: NewDonationController,
      templateUrl: 'js/Components/NewDonationComponent/NewDonation.html'
    })


  function NewDonationController() { 
    var vm = this; 
  }

})(); 