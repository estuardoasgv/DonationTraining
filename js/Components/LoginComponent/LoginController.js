(function () {
  'use strict';

  angular
    .module('DonationApp')

    .controller('LoginController', [LoginController])

    .component('loginComponent', {
      controller: LoginController,
      templateUrl: 'js/Components/LoginComponent/login.html',
      controllerAs: 'vm',
      bindings: {
        appToken: '='
      }
    })


  LoginController.$inject = ['AuthService', '$location', '$state'];

  function LoginController(AuthService, $location, $state) {
    var vm = this;

    
    vm.$onInit = onInit;
    vm.errorAuthentication = false;

    function onInit() {

        AuthService.GetAuthToken() 
    }

  }

})(); 