(function(){
    'use strict';

    angular 
        .module('DonationApp')
        .controller('StepBarController', [StepBarController])

        .component('stepBar', {
            controller: StepBarController,
            templateUrl: 'js/Components/StepsBarComponent/StepsBar.html'
        })

        StepBarController.$inject = ['$cookies'];

        function StepBarController($cookies){

        }
})();