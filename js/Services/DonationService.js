(function(){

    angular
        .module('DonationApp')
        .service('DonationService', DonationService)

        DonationService.$inject = ['PaymentRepository', '$q' ];

        function DonationService(PaymentRepository, $q){
            var service = this;

            service.DataDonation = {
                Payment: null,
                Charity: null,
                Success: false 
            };

            service.Pledge = { 
                CampaignId: 'ac58aac5-2baa-41a0-9395-898bcb939cda',
                PledgeStatusType: 0,
                DonationSourceType: 9,
                PaymentType: 5,
                FrequencyType: 1,
                PaymentAmountType: 1,
                PaymentTotalValue: null,
                AddOnTotalValue: 0,
                PaymentAmount: null,
                TotalValue: null,
                Payment: {},
                AddOnList: [],
                DesignationAmountType: 1,
                DesignationList: [
                    {
                    DesignateableEntityType: null,
                    DisplayName: null,
                    EIN: '',
                    EntityId: null,
                    EntityIdentifier: null,
                    IsDefaultPanelItem: false,
                    IsRejected: false,
                    MinimumDonation: null,
                    MinimumTotalDonationForDesignation: null,
                    Name: null,
                    DesignationAmount: null,
                    OrganizationNumber: null,
                    StandardAccountCode: null
                    }
                ],
                DeclinedMatch: true,
                DesignationWriteInList: [],
                NegativeDesignation: '',
                SignatureRequiredQuestionAnswer: '',
                PaymentIncreaseAmountType: 1,
                PaymentIncreaseAmount: 0,
                IsImpersonated: true,
                ImpersonationUser: 'Administrator',
                IsConfirmed: true
            };

            service.GetDonations = GetDonations;
            service.SaveDonation = SaveDonation;
            service.GetFrecuencyCharge = GetFrecuencyCharge;
            service.SetPaymentData = SetPaymentData;
            service.SetCharityData = SetCharityData;

            function GetDonations(pageNumber) {

                return PaymentRepository.GetDonations(pageNumber)
                    .then((res) => {
                        return res;
                    })
                    .catch((err) => {
                        authService.logout();
                        throw err;
                    })
            }

            function SaveDonation() {

                var pledge =  Array(service.Pledge);
                var ipAddress = '181.174.102.176';

                return new $q((resolve, reject) => { 
                    PaymentRepository.SaveDonation(pledge, ipAddress)
                        .then((res) => {   
                            console.log(res);
                            service.DataDonation.Success = true;
                            ClearData();
                            if(res.Errors){
                                return reject('Error')
                            } else {
                                return resolve(res);
                            }
                            
                        })
                        .catch((err) => {
                            return reject(err);
                        }) 
                    
                }) 
            }

            function SetPaymentData(content){ 
                service.DataDonation.Payment = content;
                service.DataDonation.TotalAmount = content.PaymentAmount * GetFrecuencyCharge(content.PaymentFrecuency); 
                service.Pledge.PaymentTotalValue = service.DataDonation.TotalAmount;
                service.Pledge.PaymentAmount =  service.DataDonation.TotalAmount;
                service.Pledge.TotalValue =  service.DataDonation.TotalAmount; 
            }

            function SetCharityData(content){
                service.DataDonation.Charity =  content; 
                service.Pledge.DesignationList = [
                    {
                    DesignateableEntityType: service.DataDonation.Charity.DesignationEntityType,
                    DisplayName: service.DataDonation.Charity.Name,
                    EIN: '',
                    EntityId: service.DataDonation.Charity.EntityId,
                    EntityIdentifier: service.DataDonation.Charity.EntityIdentifier,
                    IsDefaultPanelItem: false,
                    IsRejected: false,
                    MinimumDonation: service.DataDonation.Charity.MinimumDonation,
                    MinimumTotalDonationForDesignation: service.DataDonation.Charity.MinimumTotalDonationForDesignation,
                    Name: service.DataDonation.Charity.Name,
                    DesignationAmount: service.DataDonation.TotalAmount,
                    OrganizationNumber: service.DataDonation.Charity.ProfileOrganizationNumber,
                    StandardAccountCode: service.DataDonation.Charity.StandardAccountCode
                    }
                ] 
            }

            function GetFrecuencyCharge(frecuency) {
                var quantity = null;
                switch (frecuency) {
                    case 1:
                        quantity = 1;
                        break;
                    case 2:
                        quantity = 12;
                        break;
                    case 3:
                        quantity = 4;
                        break;
                    case 4:
                        quantity = 2;
                        break;
                    default:
                        quantity = null;
                        break;
                } 
                return quantity;
            }

            function ClearData(){ 
                service.DataDonation.Payment = null;
                service.DataDonation.Charity = null;
                service.Pledge.PaymentTotalValue = null;
                service.Pledge.PaymentAmount =  null;
                service.Pledge.TotalValue =  null;
                service.Pledge.DesignationList = [
                    {
                    DesignateableEntityType: null,
                    DisplayName: null,
                    EIN: '',
                    EntityId: null,
                    EntityIdentifier: null,
                    IsDefaultPanelItem: false,
                    IsRejected: false,
                    MinimumDonation: null,
                    MinimumTotalDonationForDesignation: null,
                    Name: null,
                    DesignationAmount: null,
                    OrganizationNumber: null,
                    StandardAccountCode: null
                    }
                ]

            }
            
            return service;

        }

})();