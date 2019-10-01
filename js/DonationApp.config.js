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

        registerStatefulModal(
          '/listDonation/{id}',
          'listDonation.details',
          'donationModalComponent',
          { donation: null },
          'lg'
      );

      function registerStatefulModal(url, stateName, component, params, size, resolves) {
          params = params || {};
          resolves = resolves || angular.extend({},
              resolves,
              {
                  stateParams: ['$stateParams', function ($stateParams) {
                      return $stateParams;
                  }]
              });
          size = size;        
          var modal;
          $stateProvider.state(stateName, {
              url: url,
              modal: true,
              params: params,
              onEnter: [ '$stateParams', '$uibModal', function ($stateParams, $uibModal) {

                  modal = $uibModal.open({
                      animation: true,
                      backdrop: true,
                      keyboard: true,
                      size: size,
                      component: component,
                      resolve: resolves
                  });
                  modal.result.catch(function (reason) {
                      if (reason) {
                          
                      }
                  });
                  modal.result.then(function (result) {
                      
                  });
                  modal.result.finally(function () {
                      modal.dismiss();
                  });
              }],
              onExit: function () {
                  if (modal) {
                      modal.close();
                  }
              }
          });
      };
      
    }

    function CheckLogin($transitions, $state, AuthService) {
      $transitions.onSuccess({}, function(){ 
        if(!AuthService.IsLogued() == true){
          $state.go('login');
        }
      });

      $transitions.onSuccess({to: 'login'}, function(){ 
        if(AuthService.IsLogued() == true){
          $state.go('listDonation');
        } else {
          $state.go('login');
        }
      });

     
    }
    
    
})();