(function(){
    'use strict';

    angular 
        .module('DonationApp')
        .controller('StepBarController', [StepBarController])

        .component('stepBar', {
            controller: StepBarController,
            templateUrl: 'js/Components/step-bar/step-bar.html',
            controllerAs: 'vm'
        })

        StepBarController.$inject = ['$cookies', '$rootScope','$location','$state', '$transitions', '$interval'];

        function StepBarController($cookies, $rootScope, $location, $state, $transitions){
            var vm = this; 
            vm.$onInit = onInit;

            function onInit() {
                var State = 'step1';
                State = $state.current.name;
                vm.CurrentState = State.replace('newDonation.', '');

            }
            
            $transitions.onSuccess({}, function() {
                var State = $state.current.name;
                vm.CurrentState = State.replace('newDonation.', '');
            })

        }
})();