( function(){
    'use strict';

    angular
    .module('DonationApp')
    .run(CheckLogin)
    .config(RouterConf);

    RouterConf.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
    CheckLogin.$inject = ['$transitions', '$state', 'AuthService'];

    function RouterConf($stateProvider, $locationProvider, $urlRouterProvider){

      $urlRouterProvider.otherwise('/donations');

      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });


      $stateProvider
        .state({
          name: 'login',
          url: '/',
          component: 'loginComponent'
        })

        .state({
          name: 'listDonation',
          url: '/donations',
          component: 'listDonationComponent'
        })

        .state({
          name: 'newDonation',
          url: '/new',
          templateUrl: 'js/Components/NewDonationComponent/NewDonation.html',
          redirectTo: 'newDonation.step1',
        }) 

        //Step1
        .state({
          name: 'newDonation.step1',
          url: '/step1',
          component: 'step1Component'
        })

        //Step2
        .state({
          name: 'newDonation.step2',
          url: '/step2',
          component: 'step2Component'
        })

        //Step3
        .state({
          name: 'newDonation.step3',
          url: '/step3',
          component: 'step3Component'
        })

        //Step4
        .state({
          name: 'newDonation.step4',
          url: '/step4',
          component: 'step4Component'
        })

      
    }

    function CheckLogin($transitions, $state, AuthService) {
      $transitions.onSuccess({}, function(){ 
        if(!AuthService.IsLogued() == true){
          $state.go('login');
        }
      });

     
    }
    
    
})();