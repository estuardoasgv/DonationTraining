(function(){

        angular
            .module('DonationApp')
            .controller('DonationModalController', [DonationModalController])

            .component('donationModalComponent', {
                controller: DonationModalController,
                templateUrl: 'js/Components/donation-modal/donation-modal.html',
                controllerAs: 'vm',
                bindings:  {
                    resolve: '<',
                    modalInstance: '<'
                }
            })

            DonationModalController.$inject = ['$state', '$stateParams', 'PaymentService'];

            function DonationModalController($state, $stateParams, PaymentService){

                var vm = this;
                vm.$onInit = onInit;
                vm.handleClose = handleClose;
                vm.GetPaymentLabel = GetPaymentLabel;
                

                function onInit() { 
                    if (vm.resolve.stateParams.donation) {
                        vm.donation = vm.resolve.stateParams.donation;
                    } else {
                        $state.go('listDonation')
                    }
                }

                function handleClose() {
                    $state.go('listDonation')
                };

                function GetPaymentLabel(type) {
                    var CardLabel = null;
                    PaymentService.CreditCardsList.forEach((card) => {
                        if(card.type === type) {
                            CardLabel = card.typeLabel; 
                        }
                    });
                    return CardLabel;
                }
            }
})();