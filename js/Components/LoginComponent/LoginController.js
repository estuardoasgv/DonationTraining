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

    vm.login = login;
    vm.loginForm;
    vm.$onInit = onInit;
    vm.errorAuthentication = false;

    function onInit() { 
        AuthService.GetAuthToken() 
    }


    function login(loginForm) {

      if (loginForm.$invalid){
        console.log('formulario invalido')
      }

      AuthService.AuthDonor(vm.loginForm)
      .then ((res) => {
        $state.go('listDonation');
      }).catch ((err) => {
        vm.errMsg = true;
        vm.errorMessage = 'Login Error';
        vm.loginForm.$invalid = true;
      })
    }
    

  }

})(); 