(function(){
    'use strict';

    angular 
        .module('DonationApp')
        .controller('Step4Controller', [Step4Controller])

        .component('step4Component', {
            controller: Step4Controller,
            templateUrl: 'js/Components/step-4/step-4.html',
            controllerAs: 'vm'
        })

        Step4Controller.$inject = ['PaymentService', '$location', '$state', 'DonationService' ];

        function Step4Controller(PaymentService, $location, $state, DonationService){
            var vm = this; 
           
            vm.$onInit = onInit; 
            
            function onInit() { 
                if(DonationService.DataDonation.Success != true  ){
                    $state.go('newDonation.step1');
                } 

            }
        }
})();