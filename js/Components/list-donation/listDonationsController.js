(function(){
    'use strict';

    angular
        .module('DonationApp')
        .controller('ListDonationController', [ListDonationController])

        .component('listDonationComponent', {
            controller: ListDonationController,
            templateUrl: 'js/Components/list-donation/list-donation.html',
            controllerAs: 'vm',
            bindings: {}
        })

        ListDonationController.$inject = ['DonationService', '$state', '$uibModal', 'PaymentService'];

        function ListDonationController(DonationService, $state, $uibModal, PaymentService){

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

            function GetDetail(info){  
              var infomation = DonationService.SetDonationListItem(info);
              $state.go('listDonation.details', { donation: infomation, id: info.TransactionNumber });
            } 
        }
        
})();