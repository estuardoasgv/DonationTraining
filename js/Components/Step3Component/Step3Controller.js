(function(){
    'use strict';

    angular 
        .module('DonationApp')
        .controller('Step3Controller', [Step3Controller])

        .component('step3Component', {
            controller: Step3Controller,
            templateUrl: 'js/Components/Step3Component/step3.html'
        })

        Step3Controller.$inject = ['$cockies'];

        function Step3Controller($cockies){

        }
})();