(function(){
    'use strict';

    angular 
        .module('DonationApp')
        .controller('Step1Controller', [Step1Controller])

        .component('step1Component', {
            controller: Step1Controller,
            templateUrl: 'js/Components/Step1Component/step1.html'
        })

        Step1Controller.$inject = ['$cookies'];

        function Step1Controller($cookies){

        }
})();