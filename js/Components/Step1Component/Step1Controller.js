(function(){
    'use strict';

    angular 
        .module('DonationApp')
        .controller('Step1Controller', [Step1Controller])

        .component('step1Component', {
            controller: Step1Controller,
            templateUrl: 'js/Components/Step1Component/step1.html',
            controllerAs: 'vm'
        })

        Step1Controller.$inject = ['PaymentService', '$location', '$state', 'DonationService'];

        function Step1Controller(PaymentService, $location, $state, DonationService){

            var vm = this; 
           
            vm.$onInit = onInit; 
            vm.CustomAmountRequired = false;
            vm.RemoveCustomAmount = RemoveCustomAmount;
            vm.SetCustomAmount = SetCustomAmount;
            vm.ResetAmount = ResetAmount;


            function onInit() { 

                vm.SavePayment = SavePayment;
                vm.PaymentForm;
                vm.ValidateCCNumber = ValidateCCNumber;
                vm.CustomAmountRequired = true;
                vm.ErrorMessage = false; 
                vm.PaymentDataArray = {};
                vm.PaymentState = null;
                vm.PaymentZipExtention = null;
                vm.PaymentCustomAmount = null;
                vm.CcIsValid = false;
                vm.ErrorMessageCc = false;
                DonationService.DataDonation.Success = false;


                vm.OpenExpDatePopup = OpenExpDatePopup;
                vm.expDatePopup = {
                    opened: false
                }
                vm.ExpDateOpts = {
                    minMode: 'month',
                    minDate: Date.now()
                }

                PaymentService.GetPaymentSettings()
                .then((res) => {  
                    vm.GetConfigs = res[0].InfoConfigs;  
                    vm.GetListFrequensy = res[1].FrequencyTypeList; 
                    vm.GetListCards = res[2].CreditCardTypeList; 
                })
                .catch((err) => {
                    console.log(err);
                }); 
                PaymentService.GetCountries()
                    .then((res) => { 
                        vm.GetCountries = res;  
                    })
                    .catch((err) => {
                        console.log(err);
                    });  
                PaymentService.GetStates()
                    .then((res) => { 
                        vm.GetStates = res;  
                    })
                    .catch((err) => {
                        console.log(err);
                    });  

                if(DonationService.DataDonation.Payment != null){ 
                    vm.PaymentAmount = DonationService.DataDonation.Payment.PaymentAmount; 
                    vm.PaymentCustomAmount = DonationService.DataDonation.Payment.PaymentCustomAmount;
                    vm.PaymentFrecuency = DonationService.DataDonation.Payment.PaymentFrecuency;
                    vm.PaymentCc = DonationService.DataDonation.Payment.PaymentCc;
                    vm.PaymentCardNumber = DonationService.DataDonation.Payment.PaymentCardNumber;
                    vm.PaymentValidationNumber = DonationService.DataDonation.Payment.PaymentValidationNumber;
                    vm.PaymentNameCard = DonationService.DataDonation.Payment.PaymentNameCard;
                    vm.PaymentExpirationDate = DonationService.DataDonation.Payment.PaymentExpirationDate;
                    vm.PaymentEmail = DonationService.DataDonation.Payment.PaymentEmail;
                    vm.PaymentCountry = DonationService.DataDonation.Payment.PaymentCountry;
                    vm.PaymentAddress1 = DonationService.DataDonation.Payment.PaymentAddress1;
                    vm.PaymentAddress2 = DonationService.DataDonation.Payment.PaymentAddress2;
                    vm.PaymentCity = DonationService.DataDonation.Payment.PaymentCity;
                    vm.PaymentState = DonationService.DataDonation.Payment.PaymentState;
                    vm.PaymentProvince = DonationService.DataDonation.Payment.PaymentProvince;
                    vm.PaymentZip = DonationService.DataDonation.Payment.PaymentZip;
                    vm.PaymentZipExtention = DonationService.DataDonation.Payment.PaymentZipExtention; 
                    console.log(DonationService.DataDonation.Payment);
                }  
            }  

            function SavePayment(PaymentForm){ 

                if (PaymentForm.$invalid) {
                    vm.ErrorMessage = true; 
                    vm.ErrorMessageText = "Verify that all fields are filled and correct.";
                } else {
                    vm.ErrorMessage = false; 
                    vm.PaymentDataArray.PaymentAmount = vm.PaymentAmount; 
                    vm.PaymentDataArray.PaymentCustomAmount = vm.PaymentCustomAmount;
                    vm.PaymentDataArray.PaymentFrecuency = vm.PaymentFrecuency;
                    vm.PaymentDataArray.PaymentCc = vm.PaymentCc;
                    vm.PaymentDataArray.PaymentCardNumber = vm.PaymentCardNumber;
                    vm.PaymentDataArray.PaymentValidationNumber = vm.PaymentValidationNumber;
                    vm.PaymentDataArray.PaymentNameCard = vm.PaymentNameCard;
                    vm.PaymentDataArray.PaymentExpirationDate = vm.PaymentExpirationDate;
                    vm.PaymentDataArray.PaymentEmail = vm.PaymentEmail;
                    vm.PaymentDataArray.PaymentCountry = vm.PaymentCountry;
                    vm.PaymentDataArray.PaymentAddress1 = vm.PaymentAddress1;
                    vm.PaymentDataArray.PaymentAddress2 = vm.PaymentAddress2;
                    vm.PaymentDataArray.PaymentCity = vm.PaymentCity;
                    vm.PaymentDataArray.PaymentState = vm.PaymentState;
                    vm.PaymentDataArray.PaymentProvince = vm.PaymentProvince;
                    vm.PaymentDataArray.PaymentZip = vm.PaymentZip;
                    vm.PaymentDataArray.PaymentZipExtention = vm.PaymentZipExtention;
                    vm.CcIsValid = ValidateCCNumber(vm.PaymentCc, vm.PaymentCardNumber);

                    if (vm.CcIsValid == true) {
                        vm.ErrorMessageCc = false; 
                        DonationService.SetPaymentData(vm.PaymentDataArray); 
                        $state.go('newDonation.step2');
                    } else {
                        vm.ErrorMessageCc = true; 
                        vm.ErrorMessageTextCc = "The Credit Card Number Is Incorrect"; 
                    } 
                } 
                
            }

            function ValidateCCNumber(type, number){ 
                vm.CcIsValid = false;
                if (!type) {
                    return false;
                } else {
                    PaymentService.CreditCardsList.forEach(card => {
                        var regexType = card.typeLabel;
                        if (card.type === type && PaymentService.CcRegex[regexType].test(number)) {
                            vm.CcIsValid = true; 
                        }
                    }); 
                    return vm.CcIsValid;
                }
            }

            function RemoveCustomAmount() {
                vm.CustomAmountRequired = false;
                vm.PaymentCustomAmount = null;
            }
            function SetCustomAmount() {
                vm.CustomAmountRequired = false;
            }
            function ResetAmount() { 
                vm.PaymentAmount = vm.PaymentCustomAmount;
            }

            function OpenExpDatePopup() {
                vm.expDatePopup.opened = true;
            }

        }
})();