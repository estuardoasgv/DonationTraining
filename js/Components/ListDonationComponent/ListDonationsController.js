(function(){
    'use strict';

    angular
        .module('DonationApp')
        .controller('ListDonationController', [ListDonationController])

        .component('listDonationComponent', {
            controller: ListDonationController,
            templateUrl: 'js/Components/ListDonationComponent/ListDonation.html',
            controllerAs: 'vm'
        })

        ListDonationController.$inject = ['$cookies', 'DonationService', '$state', 'PaymentService'];

        function ListDonationController($cookies, DonationService, $state, PaymentService){

            var vm = this;
            vm.$onInit = onInit;
            

            function onInit() { 
                vm.GetPaymentLabel = GetPaymentLabel;
                vm.GetDonations = GetDonations;
                vm.GetDetail = GetDetail;
                GetDonations(0);
            }

            function GetDonations(pageNumber) {
                DonationService.GetDonations(pageNumber)
                    .then((res) => {
                        vm.TotalRecords = res.RecordCount;
                        vm.DonationsList = res.Data.PledgeList; 
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            }

            function GetPaymentLabel(type) {
                var CardLabel = null;
                PaymentService.CreditCardsList.forEach((card) => {
                    if(card.type === type) {
                        CardLabel = card.typeLabel; 
                    }
                });
                return CardLabel;
            }

            function GetDetail(Donation){ 
                vm.ModalDate  = Donation.DateLastUpdated;
                vm.ModalStatus = Donation.PledgeStatusType;
                vm.ModalPaymentType = Donation.PaymentType;
                vm.ModalPaymentAmount = Donation.PaymentAmount;
                vm.ModalTotalValue = Donation.TotalValue;
                vm.ModalCharity = Donation.DesignationList[0].Name;
                vm.ModalHeader = Donation.TransactionNumber; 
            } 
        }
        
})();