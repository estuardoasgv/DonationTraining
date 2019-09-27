(function(){

    angular
        .module('DonationApp')
        .service('PaymentService', PaymentService)

        PaymentService.$inject = ['PaymentRepository', '$q' ];

        function PaymentService(PaymentRepository, $q){
            var service = this;

            service.GetPaymentSettings = GetPaymentSettings;
            service.GetCountries = GetCountries; 
            service.GetStates = GetStates;
            service.mapFrequencyTypes = mapFrequencyTypes;
            service.mapCreditcardsList = mapCreditcardsList; 
            service.GetCharities = GetCharities;
            service.CreditCardsList = [
                { type: 1, typeLabel : 'Visa'},
                { type: 2, typeLabel : 'Master Card'},
                { type: 3, typeLabel : 'American Express'},
                { type: 4, typeLabel : 'Discover'},
                { type: 5, typeLabel : 'Diners Club'}
            ];
            service.CcRegex = {
                'Visa': /^4[0-9]{12}(?:[0-9]{3})?$/,
                'Master Card': /^5[1-5][0-9]{14}$/,
                'American Express': /^3[47][0-9]{13}$/,
                'Discover': /^6(?:011|5[0-9]{2})[0-9]{12}$/,
                'Diners Club': /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/
            };

            function GetPaymentSettings(){ 
                return new $q((resolve, reject) => {
                    PaymentRepository.GetPaymentConfig()
                        .then((res) => { 
                            var dataApp = [ 
                                {  InfoConfigs : res.data.Data},
                                {  FrequencyTypeList : mapFrequencyTypes(res.data.Data.FrequencyTypeList)},
                                {  CreditCardTypeList : mapCreditcardsList(res.data.Data.CreditCardTypeList)},
                            ] 
                            return resolve(dataApp);
                        })
                        .catch((err) => {  
                            return reject(err);
                        })
                    
                })
            }

            function GetCountries(){ 
                return new $q((resolve, reject) => {
                    PaymentRepository.GetCountries()
                        .then((res) => {
                            return resolve(res.data.Data);
                        })
                        .catch((err) => {  
                            return reject(err);
                        })
                    
                }) 
            }

            function GetStates(){
                return new $q((resolve, reject) => {
                    PaymentRepository.GetStates()
                        .then((res) => {
                            return resolve(res.data.Data);
                        })
                        .catch((err) => {  
                            return reject(err);
                        })
                    
                }) 
            }

            function GetCharities(){
                return new $q((resolve, reject) => {
                    PaymentRepository.GetCharities()
                        .then((res) => {
                            return resolve(res.data.Data);
                        })
                        .catch((err) => {  
                            return reject(err);
                        })
                    
                }) 
            }

            function mapFrequencyTypes(frequency) {

                return frequency.map((type) => {
                    
                    var typeLabel = null;

                    switch (type) {
                        case 1:
                            typeLabel = 'One-time'
                            break;
                        case 2:
                            typeLabel = 'Monthly'
                            break;
                        case 3:
                            typeLabel = 'Quarterly'
                            break;
                        case 4:
                            typeLabel = 'Semi-annual'
                            break;
                        default:
                            typeLabel = null;
                            break;
                    }
                    return {
                        type: type,
                        typeLabel: typeLabel
                    }
                })
            }

            function mapCreditcardsList(creditcards) {

                return creditcards.map((type) => {
                    
                    var typeLabel = null;

                    switch (type) {
                        case 1:
                            typeLabel = 'Visa';
                            break;
                        case 2:
                            typeLabel = 'Master Card';
                            break;
                        case 3:
                            typeLabel = 'American Express';
                            break;
                        case 4:
                            typeLabel = 'Discover';
                            break;
                        case 5:
                            typeLabel = 'Diners Club';
                            break;
                        default:
                            typeLabel = null;
                            break;
                    }
                    return {
                        type: type,
                        typeLabel: typeLabel,
                    }
                })
            }

            return service;

        }

})();