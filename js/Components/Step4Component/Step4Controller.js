(function(){
    'use strict';

    angular 
        .module('DonationApp')
        .controller('Step4Controller', [Step4Controller])

        .component('step4Component', {
            controller: Step4Controller,
            templateUrl: 'js/Components/Step4Component/step4.html'
        })

        Step4Controller.$inject = ['$cockies'];

        function Step4Controller($cockies){

        }
})();