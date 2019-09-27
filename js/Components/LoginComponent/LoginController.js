(function () {
  'use strict';

  angular
    .module('DonationApp')

    .controller('LoginController', [LoginController])

    .component('loginComponent', {
      controller: LoginController,
      templateUrl: 'js/Components/LoginComponent/login.html',
      controllerAs: 'vm'
    })


  LoginController.$inject = ['AuthService', '$location', '$state', '$interval'];

  function LoginController(AuthService, $location, $state,  $interval) {
    var vm = this;
    vm.$onInit = onInit; 

    function onInit() { 
        vm.login = login;
        vm.loginForm;
        AuthService.GetAuthToken(); 
        $interval(function(){ AuthService.GetAuthToken(); }, 1000*60*5 )
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