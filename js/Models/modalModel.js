(function(){

    angular
        .module('DonationApp')
        .factory('ModalModel', ModalModel)

        function ModalModel(){
            var model = function() { 

                this.data = {
                    PledgeStatusType: null,
                    PaymentType: null,
                    TransactionNumber: null,
                    DateCreated: null,
                    PaymentAmount: null,
                    TotalValue: null,
                    DesignationList: null
                };

                this.SetModel = SetModel;
                this.GetModel = GetModel;
            }

            

            

            function SetModel(data){
                this.data = { 
                    ...this.data,
                    ...data
                }
            }
    
            function GetModel() {
                return this.data;
            }

            return model;
        }

        

        
})()