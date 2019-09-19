(function(){
    'use strict';

    angular 
        .module('DonationApp')
        .controller('Step2Controller', [Step2Controller])

        .component('step2Component', {
            controller: Step2Controller,
            templateUrl: 'js/Components/Step2Component/step2.html'
        })

        Step2Controller.$inject = ['$cockies'];

        function Step2Controller($cockies){

        }
})();