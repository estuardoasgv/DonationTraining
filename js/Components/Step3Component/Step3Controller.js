(function(){
    'use strict';

    angular 
        .module('DonationApp')
        .controller('Step3Controller', [Step3Controller])

        .component('step3Component', {
            controller: Step3Controller,
            templateUrl: 'js/Components/Step3Component/step3.html',
            controllerAs: 'vm'
        })

        Step3Controller.$inject = ['PaymentService', '$location', '$state', 'DonationService' ];

        function Step3Controller(PaymentService, $location, $state, DonationService){

            var vm = this; 
            vm.$onInit = onInit; 
            
            function onInit() { 
                vm.SendDonation = SendDonation; 
                vm.GetFrecuencyName = GetFrecuencyName;
                vm.BilledDate = new Date();

                if(DonationService.DataDonation.Charity != null && DonationService.DataDonation.Charity != null){
                    console.log(DonationService.DataDonation);
                    vm.ResumeDonation =  DonationService.DataDonation;
                } else if(DonationService.DataDonation.Payment == null ){
                    $state.go('newDonation.step1');
                } else {
                    $state.go('newDonation.step2');
                }
            } 

            function SendDonation(){

                DonationService.SaveDonation()
                .then((res) => { 
                    console.log(res);
                    $state.go('newDonation.step4');
                })
                .catch((err) => {
                    vm.ErrorMessage = true; 
                    vm.ErrorMessageText = "Sorry, something went wrong";
                    console.log(err);
                });

            }

            function GetFrecuencyName(type) {

                var typeLabel = null;

                switch (type) {
                    case 1:
                        typeLabel = 'One-time'
                        break;
                    case 2:
                        typeLabel = 'Monthly'
                        break;
                    case 3:
                        typeLabel = 'Quarterly'
                        break;
                    case 4:
                        typeLabel = 'Semi-annual'
                        break;
                    default:
                        typeLabel = null;
                        break;
                }
                return typeLabel;
            }

        }
})();