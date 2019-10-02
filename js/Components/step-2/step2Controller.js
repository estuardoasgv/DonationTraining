(function(){
    'use strict';

    angular 
        .module('DonationApp')
        .controller('Step2Controller', [Step2Controller])

        .component('step2Component', {
            controller: Step2Controller,
            templateUrl: 'js/Components/step-2/step-2.html',
            controllerAs: 'vm'
        })

        Step2Controller.$inject = ['PaymentService', '$location', '$state', 'DonationService' ];

        function Step2Controller(PaymentService, $location, $state, DonationService){

            var vm = this; 
           
            vm.$onInit = onInit; 
            

            function onInit() { 
                vm.SaveCharity = SaveCharity;
                vm.CharityForm;
                vm.charityData;
                vm.CharitySelected = '';
                
                PaymentService.GetCharities()
                    .then((res) => { 
                        vm.GetCharities = res;
                    })
                    .catch((err) => {
                        console.log(err);
                    });  

                if(DonationService.DataDonation.Payment !== null){
                    if(DonationService.DataDonation.Charity !== null){ 
                        vm.CharitySelected = DonationService.DataDonation.Charity.EntityId;
                    } else {
                        console.log(DonationService.DataDonation.Payment);
                    } 
                } else {
                    $state.go('newDonation.step1');
                }
            }

            function SaveCharity(CharityForm){ 

                if (CharityForm.$invalid){
                    vm.ErrorMessage = true; 
                    vm.ErrorMessageText = "Select An Option";

                } else {
                    vm.GetCharities.PanelItemList.forEach(Charity => {
                        if(vm.CharitySelected == Charity.EntityId ){ 
                            vm.charityDataItem = Charity; 
                        }   
                    });  
                    DonationService.SetCharityData(vm.charityDataItem);
                    $state.go('newDonation.step3');
                } 
            } 

        }
})();