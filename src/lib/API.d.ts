declare namespace API {
    export interface AdSignInRequest {
        username?: string;
        password?: string;
    }
    export interface AddTargetSavingsRequestDto {
        id?: string; // uuid
        profileID?: string; // uuid
        paystackReference?: string;
        period?: number; // int32
        tokenizedID?: string;
        prefTimeID?: number; // int32
        savingsTypeID?: number; // int32
        savingsFrequencyID?: number; // int32
        amt?: number; // double
        targetPeriod?: string;
        targetAmountInView?: number; // double
        item?: string;
        startdate?: string; // date-time
        maturitydate?: string; // date-time
        txndate?: string; // date-time
        nextRenewalDate?: string; // date-time
    }
    export interface AddUserWithEmailRequestDto {
        bvn?: string;
        dateOfBirth?: string; // date-time
        email?: string;
        preferredName?: string;
        phoneNumber?: string;
        initialAccountSelected?: string;
        firstName?: string;
        lastName?: string;
        productCode?: string;
        branch?: string;
        currency?: string;
        address?: string;
        sector?: string;
        industry?: string;
        nationality?: string;
        sideHustle?: string;
        trybersCode?: string;
        gender?: string;
        schoolName?: string;
        serviceProvider?: string;
        courseDuration?: string;
        level?: string;
        instagramHandle?: string;
        twitterHandle?: string;
        password?: string;
        videoUrl?: string;
        trybersReferralCode?: string;
    }
    export interface AdminLoginRequestDto {
        email?: string;
        branch?: string;
        userLevelId?: number; // int64
        userName?: string;
        createdBy?: string;
    }
    export interface Authorization {
        authorization_code?: string;
        channel?: string;
        card_type?: string;
        bank?: string;
        country_code?: string;
        brand?: string;
        reusable?: boolean;
        signature?: string;
    }
    export interface BVNRequestModel {
        bvn?: string;
        dateOfBirth?: string; // date-time
    }
    export interface BVNResponseModel {
        responseCode?: string;
        bvn?: string;
        firstName?: string;
        middleName?: string;
        lastName?: string;
        dateOfBirth?: string;
        phoneNumber?: string;
        registrationDate?: string;
        enrollmentBank?: string;
        enrollmentBranch?: string;
        email?: string;
        gender?: string;
        phoneNumber2?: string;
        levelOfAccount?: string;
        lgaOfOrigin?: string;
        lgaOfResidence?: string;
        maritalStatus?: string;
        nin?: string;
        nameOnCard?: string;
        nationality?: string;
        residentialAddress?: string;
        stateOfOrigin?: string;
        stateOfResidence?: string;
        title?: string;
        watchListed?: string;
        base64Image?: string;
        responseDesc?: string;
    }
    export interface BankAccountFullInfoNew {
        nuban?: string;
        brA_CODE?: string;
        deS_ENG?: string;
        cuS_NUM?: string;
        cuR_CODE?: string;
        leD_CODE?: string;
        suB_ACCT_CODE?: {
        };
        cuS_SHO_NAME?: string;
        accountGroup?: string;
        customerStatus?: string;
        adD_LINE1?: string;
        adD_LINE2?: string;
        moB_NUM?: string;
        email?: string;
        accT_NO?: string;
        maP_ACC_NO?: string;
        accT_TYPE?: string;
        isO_ACCT_TYPE?: string;
        teL_NUM?: string;
        datE_OPEN?: string;
        stA_CODE?: string;
        clE_BAL?: string;
        crnT_BAL?: string;
        baL_LIM?: {
        };
        toT_BLO_FUND?: string;
        introducer?: {
        };
        datE_BAL_CHA?: string;
        namE_LINE1?: {
        };
        namE_LINE2?: string;
        bvn?: string;
        resT_FLAG?: string;
        restriction?: RESTRICTIONS[];
        isSMSSubscriber?: string;
        alt_Currency?: string;
        currency_Code?: string;
        t24_BRA_CODE?: string;
        t24_CUS_NUM?: string;
        t24_CUR_CODE?: string;
        t24_LED_CODE?: string;
        onlineActualBalance?: string;
        onlineClearedBalance?: string;
        openActualBalance?: string;
        openClearedBalance?: string;
        workingBalance?: string;
        customerStatusCode?: string;
        customerStatusDeecp?: string;
        limitID?: {
        };
        limitAmt?: string;
        minimumBal?: string;
        usableBal?: string;
        accountDescp?: string;
        courtesyTitle?: string;
        accountTitle?: string;
        amfCharges?: {
        };
    }
    export interface BaseResponse {
        responseCode?: string;
        responseDescription?: string;
    }
    export interface BeneficiaryListDTO {
        beneficiaries?: BeneficiaryResponseDTO[];
        responseCode?: string;
        responseDescription?: string;
    }
    export interface BeneficiaryRequestDTO {
        userId?: string; // uuid
        beneficiaryAccountNumber?: string;
        beneficiaryAccountName?: string;
        beneficiaryBankName?: string;
        beneficiaryBankCode?: string;
        frequency?: number; // int32
    }
    export interface BeneficiaryResponseDTO {
        userId?: string; // uuid
        beneficiaryAccountNumber?: string;
        beneficiaryAccountName?: string;
        beneficiaryBankName?: string;
        beneficiaryBankCode?: string;
        frequency?: number; // int32
    }
    export interface Biller {
        id?: string;
        name?: string;
        shortName?: string;
        narration?: string;
    }
    export interface BillerItemList {
        id?: string;
        name?: string;
        amount?: string;
        consumerIdField?: string;
        isAmountFixed?: boolean;
        itemFee?: string;
        paymentCode?: string;
        vat?: string;
    }
    export interface BreakBoxRequestModel {
        targetId?: string; // uuid
    }
    export interface CAMURequestModel {
        folio?: string;
        dataFields?: CamuDataFields;
    }
    export interface CamuAzureImageRequest {
        appId?: string;
        folderName?: string;
        fileName?: string;
        base64String?: string;
    }
    export interface CamuDataFields {
        accountName?: string;
        accountNumber?: string;
        branchCode?: string;
        bvn?: string;
        source?: string;
        disContactPersonAdd?: string;
        disContactPersonMobile?: string;
        disContactPersonName?: string;
        dob?: string;
        emailAddress?: string;
        firstName?: string;
        lastName?: string;
        middleName?: string;
        mobileNumber?: string;
        residentialAddress?: string;
        urlMeansOfID?: string;
        urlOther?: string;
        urlPhotoID?: string;
        addState?: string;
        urlReference1?: string;
        urlReference2?: string;
        urlMandate?: string;
    }
    export interface Card {
        cvv?: string;
        expiry_month?: number; // int32
        expiry_year?: number; // int32
        number?: string;
    }
    export interface CardData {
        card_provider?: string;
        card_name?: string;
        card_number?: string;
        expiry_date?: string;
        cvv2?: string;
    }
    export interface CardObj {
        card_provider?: string;
        card_name?: string;
        card_number?: string;
        expiry_date?: string;
        cvv2?: string;
        card_status?: string;
        block_status?: string;
    }
    export interface Category {
        id?: string;
        name?: string;
        description?: string;
    }
    export interface ChargeCustomerRequestDto {
        email?: string;
        amount?: string;
        card?: Card;
        pin?: string;
        reference?: string;
        profileId?: string; // uuid
    }
    export interface ChargeCustomerResponseDTO {
        status?: boolean;
        message?: string;
        action?: string;
        paystackReference?: string;
        data?: PaystackResponseData;
        responseCode?: string;
        responseDescription?: string;
    }
    export interface CheckPINRequestDto {
        accountNumber?: string;
        pin?: string;
    }
    export interface CheckPINResponseDto {
        isFound?: boolean;
        responseCode?: string;
        responseDescription?: string;
    }
    export interface CreateWalletRequestDto {
        firstname?: string;
        lastname?: string;
        mobile?: string;
        dob?: string; // date-time
        gender?: string;
        currencycode?: string;
        email?: string;
        trybersCode?: string;
        password?: string;
        trybersReferralCode?: string;
        preferredName?: string;
        phoneNumber?: string;
        initialAccountSelected?: string;
        productCode?: string;
        branch?: string;
        currency?: string;
        address?: string;
        sector?: string;
        industry?: string;
        nationality?: string;
        sideHustle?: string;
        schoolName?: string;
        serviceProvider?: string;
        courseDuration?: string;
        level?: string;
        instagramHandle?: string;
        twitterHandle?: string;
        videoUrl?: string;
        title?: string;
        transactionPIN?: string;
        accountTier?: string;
    }
    export interface CreditSwitchVendAirtimeRequestDto {
        mobileNo?: string;
        serviceId?: string;
        airtimeAmount?: string;
        sessionID?: string;
        appId?: number; // int32
        walletNumber?: string;
        remark?: string;
        pin?: string;
    }
    export interface CreditSwitchVendAirtimeResponseDto {
        statusCode?: string;
        statusDescription?: string;
        mReference?: string;
        tranxReference?: string;
        recipient?: string;
        amount?: string;
        confirmCode?: string;
        tranxDate?: string;
        responseCode?: string;
        responseDescription?: string;
    }
    export interface CreditSwitchVendDataRequestDto {
        mobileNo?: string;
        serviceId?: string;
        dataAmount?: string;
        sessionID?: string;
        productid?: string;
        appId?: number; // int32
        walletNumber?: string;
        remark?: string;
        pin?: string;
    }
    export interface Customer {
        id?: number; // int32
        first_name?: string;
        last_name?: string;
        email?: string;
        customer_code?: string;
        phone?: {
        };
        metadata?: {
        };
        risk_action?: string;
    }
    export interface DataPlan {
        amount?: number; // int32
        databundle?: string;
        validity?: string;
        productId?: string;
    }
    export interface FullDetailsData {
        customerid?: string;
        firstname?: string;
        nuban?: string;
        availablebalance?: number; // double
        lastname?: string;
        fullname?: string;
        mobile?: string;
        phone?: string;
        gender?: string;
        email?: string;
        currencycode?: string;
        restind?: number; // int32
    }
    export interface GeneralResponse {
        exists?: boolean;
        responseCode?: string;
        responseDescription?: string;
    }
    export interface GetAccountFullInfoResponse {
        bankAccountFullInfo?: BankAccountFullInfoNew;
        responseCode?: string;
        responseDescription?: string;
    }
    export interface GetBillerByCategoryArray {
        billers?: Biller[];
        responseCode?: string;
        totalAvailable?: number; // int32
    }
    export interface GetBillerByCategoryResponse {
        getBillerByCategoryArray?: GetBillerByCategoryArray[];
        responseCode?: string;
        responseDescription?: string;
    }
    export interface GetCardRequestDto {
        accountId?: string;
    }
    export interface GetCardResponseDto {
        status?: string;
        responseCode?: string;
        responseMessage?: string;
        data?: CardObj[];
    }
    export interface GetDataPlanRequestDto {
        serviceId?: string;
        sessionID?: string;
        appId?: number; // int32
    }
    export interface GetDataPlanResponseDto {
        statusCode?: string;
        statusDescription?: string;
        serviceId?: string;
        dataPlan?: DataPlan[];
        responseCode?: string;
        responseDescription?: string;
    }
    export interface GetFeeResponse {
        feeAmount?: number; // double
        vat?: number; // double
        responseCode?: string;
        responseDescription?: string;
    }
    export interface GetPaymentItemResponseArray {
        responseCode?: string;
        billerItemLists?: BillerItemList[];
    }
    export interface GetPaymentItemResponseDto {
        getPaymentItemResponseArray?: GetPaymentItemResponseArray[];
        responseCode?: string;
        responseDescription?: string;
    }
    export interface GetPreferredTimeResponseDTO {
        preferredTimes?: PreferredTimeDTO[];
        responseCode?: string;
        responseDescription?: string;
    }
    export interface GetSavingsFrequencyResponseDTO {
        savingsFrequencyList?: SavingsFrequencyDTO[];
        responseCode?: string;
        responseDescription?: string;
    }
    export interface GetSavingsTypeResponseDTO {
        savingsTypes?: SavingsTypeDTO[];
        responseCode?: string;
        responseDescription?: string;
    }
    export interface GetTargetSavingsResponseDto {
        id?: string; // uuid
        profileID?: string; // uuid
        tokenizedID?: string;
        prefTimeID?: number; // int32
        savingsFrequencyID?: number; // int32
        savingsTypeID?: number; // int32
        amt?: number; // double
        targetPeriod?: string;
        lockID?: string;
        int_accrued?: number; // double
        int_accrued_date?: string; // date-time
        startdate?: string; // date-time
        maturitydate?: string; // date-time
        txndate?: string; // date-time
        statusflag?: number; // int32
        dateStatusChanged?: string; // date-time
        targetAmountInView?: number; // double
        item?: string;
    }
    export interface GetTargetSavingsResponseListDto {
        targetSavings?: GetTargetSavingsResponseDto[];
        responseCode?: string;
        responseDescription?: string;
    }
    export interface InstitutionDto {
        id?: number; // int32
        countryId?: number; // int32
        countryName?: string;
        institutionName?: string;
        isActive?: boolean;
    }
    export interface InstitutionList {
        institutions?: InstitutionDto[];
        responseCode?: string;
        responseDescription?: string;
    }
    export interface InterswitchGetBillerCategoryResponseDto {
        responseArray?: MyArray[];
        responseCode?: string;
        responseDescription?: string;
    }
    export interface MandateImagesModel {
        images?: string[];
        customerId?: string;
        folderName?: string;
        fileName?: string;
    }
    export interface MandateImagesResponse {
        imageUrl?: string;
        responseCode?: string;
        responseDescription?: string;
    }
    export interface MyArray {
        responseCode?: string;
        totalAvailable?: number; // int32
        categories?: Category[];
    }
    export interface NIPInterBankInsertDto {
        neSessionID?: string;
        sessionID?: string;
        channelCode?: number; // int32
        paymentRef?: string;
        amount?: number; // double
        fee?: number; // double
        vat?: number; // double
        braCodeVal?: string;
        cusNumVal?: string;
        curCodeVal?: string;
        ledCodeVal?: string;
        subAcctVal?: string;
        orignatorName?: string;
        destinationBankCode?: string;
        accountName?: string;
        accountNumber?: string;
        originatorAccountNumber?: string;
        accountLockID?: string;
        appID?: number; // int32
        originatorBankVerificationNumber?: string;
        beneficiaryBankVerificationNumber?: string;
        beneficiaryKYCLevel?: string;
        originatorKYCLevel?: string;
    }
    export interface NameEnquiryRequest {
        sessionId?: string;
        destinationBankCode?: string;
        channelCode?: string;
        accountNumber?: string;
    }
    export interface NameEnquiryResponse {
        accountName?: string;
        beneficiaryBankVerificationNumber?: string;
        beneficiaryKYCLevel?: string;
        sessionId?: string;
        responseCode?: string;
        responseDescription?: string;
    }
    export interface OTPRequestDto {
        mobile?: string;
        email?: string;
        clientID?: string;
    }
    export interface OtpResponse {
        responseCode?: string;
        phoneNumber?: string;
    }
    export interface ParticipatingBank {
        bankcode?: string;
        bankname?: string;
        transRate?: number; // int32
        logoUrl?: string;
    }
    export interface ParticipatingBanks {
        participatingBankList?: ParticipatingBank[];
        responseCode?: string;
        responseDescription?: string;
    }
    export interface PayBillerData {
        billerResponse?: string;
        status?: string;
    }
    export interface PayBillerRequestDto {
        referenceid?: string;
        requestType?: number; // int32
        translocation?: string;
        amt?: string;
        paymentcode?: string;
        mobile?: string;
        email?: string;
        subscriberInfo1?: string;
        nuban?: string;
        transactionType?: string;
        appId?: number; // int32
        remark?: string;
        pin?: string;
    }
    export interface PayBillerSubResponse {
        message?: string;
        response?: string;
        responsedata?: string;
        data?: PayBillerData;
        responseCode?: string;
        responseDescription?: string;
    }
    export interface PaystackResponseData {
        url?: string;
        display_text?: string;
        authorization_code?: string;
        channel?: string;
        card_type?: string;
        bank?: string;
        country_code?: string;
        brand?: string;
        reusable?: boolean;
        signature?: string;
        customer?: Customer;
        id?: number; // int32
        domain?: string;
        status?: string;
        reference?: string;
        amount?: number; // double
        message?: string;
        gateway_response?: string;
        paid_at?: string; // date-time
        created_at?: string; // date-time
        currency?: string;
        ip_address?: string;
        metadata?: string;
        log?: string;
        fees?: number; // double
        fees_split?: string;
        authorization?: Authorization;
        plan?: string;
        order_id?: string;
        paidAt?: string; // date-time
        createdAt?: string; // date-time
        transaction_date?: string; // date-time
        authorization_url?: string;
        access_code?: string;
    }
    export interface PreferredTimeDTO {
        prefTimeId?: number; // int32
        time?: string;
        isActive?: boolean;
    }
    export interface RESTRICTIONS {
        restrictionCode?: string;
        restrictionDescription?: string;
    }
    export interface RequestPINRequest {
        email?: string;
        pin?: string;
        oldPIN?: string;
    }
    export interface RequestPasswordRequest {
        email?: string;
        password?: string;
        oldPassword?: string;
    }
    export interface SavingsFrequencyDTO {
        id?: number; // int32
        frequencyDescription?: string;
        isActive?: boolean;
    }
    export interface SavingsTypeDTO {
        id?: number; // int32
        savingsTypeName?: string;
        description?: string;
        imageUrl?: string;
        isActive?: boolean;
    }
    export interface SchoolCountryDto {
        id?: number; // int32
        name?: string;
    }
    export interface SchoolCountryList {
        schoolCountries?: SchoolCountryDto[];
        responseCode?: string;
        responseDescription?: string;
    }
    export interface SchoolDto {
        id?: number; // int32
        schoolName?: string;
        isActive?: boolean;
    }
    export interface SchoolList {
        schools?: SchoolDto[];
        responseCode?: string;
        responseDescription?: string;
    }
    export interface SignInWithNuban {
        nuban?: string;
        password?: string;
    }
    export interface SubmitBirthdayDto {
        birthday?: string; // date-time
        reference?: string;
    }
    export interface SubmitOtpRequestDto {
        otp?: string;
        reference?: string;
    }
    export interface SubmitPhoneRequestDto {
        phone?: string;
        reference?: string;
    }
    export interface SubmitPinRequestDto {
        pin?: string;
        reference?: string;
    }
    export interface TransactionDetails {
        trA_DATE?: string; // date-time
        currencycode?: string;
        amt?: number; // double
        deb_cre_ind?: number; // int32
        val_date?: string; // date-time
        remarks?: string;
        balanceAD?: number; // double
        balanceAC?: number; // double
        balance?: number; // double
    }
    export interface UpdateTargetSavingsRequest {
        newAmount?: number; // double
        targetId?: string; // uuid
        profileId?: string; // uuid
    }
    export interface UploadImageToAzureResponse {
        url?: string;
        responseCode?: string;
        responseDescription?: string;
    }
    export interface UploadToCamuResponse {
        referenceID?: string;
        responseCode?: string;
        responseDescription?: string;
    }
    export interface UploadVideoRequest {
        emailAddress?: string;
        videoURL?: string;
        sessionKey?: string;
    }
    export interface UserNubanDto {
        accountNumber?: string;
        accountType?: string;
        userId?: string; // uuid
        customerId?: string;
        accountName?: string;
        currency?: string;
        addedDate?: string; // date-time
        modifiedDate?: string; // date-time
        passportPhoto?: string;
        validIdType?: string;
        validIdNumber?: string;
        signature?: string;
        validId?: string;
        reference?: string;
        bvN_Firstname?: string;
        bvN_Lastname?: string;
        jointAccountTransferLimit?: number; // double
        sqNo?: number; // int32
        accountLinkCode?: string; // uuid
        accountCategory?: 1 | 2; // int32
        residence?: string;
        rcNumber?: string;
        incorpDate?: string;
        tin?: string;
        shortTitle?: string;
    }
    export interface UserResponseModel {
        id?: string; // uuid
        bvn?: string;
        dateOfBirth?: string; // date-time
        email?: string;
        phoneNumber?: string;
        address?: string;
        country?: string;
        state?: string;
        accountNumber?: string;
        isActive?: boolean;
        firstName?: string;
        middleName?: string;
        lastName?: string;
        preferredName?: string;
        sector?: string;
        industry?: string;
        nationality?: string;
        gender?: string;
        title?: string;
        interestedInLoanProducts?: string;
        maritalStatus?: string;
        numberOfChildren?: string;
        occupation?: string;
        hobby?: string;
        nokFirstName?: string;
        nokMiddleName?: string;
        nokFullName?: string;
        nokLastName?: string;
        nokAddress?: string;
        nokPhoneNumber?: string;
        nokRelationship?: string;
        employmentStatus?: string;
        employerName?: string;
        employmentAddress?: string;
        addressTown?: string;
        addressState?: string;
        addressLandmark?: string;
        accountDetails?: UserNubanDto[];
        addedDate?: string; // date-time
        modifiedDate?: string; // date-time
        sessionKey?: string;
        passportPhoto?: string;
        validIdType?: string;
        validIdNumber?: string;
        signature?: string;
        validId?: string;
        reference?: string;
        bvN_Firstname?: string;
        bvN_Lastname?: string;
        residence?: string;
        sideHustle?: string;
        schoolName?: string;
        trybersCode?: string;
        courseDuration?: string;
        level?: string;
        instagramHandle?: string;
        twitterHandle?: string;
        videoUrl?: string;
        branch?: string;
        serviceProvider?: string;
        trybersReferralCode?: string;
        responseCode?: string;
        responseDescription?: string;
    }
    export interface UserResponseModelList {
        userModelList?: UserResponseModel[];
        responseCode?: string;
        responseDescription?: string;
    }
    export interface UserTransactionRequestDto {
        number?: string;
        startDate?: string; // date-time
        endDate?: string; // date-time
    }
    export interface ValidateChargeRequest {
        reference?: string;
    }
    export interface ValidateCustomeInforesponse {
        validateResponse?: string;
        responseCode?: string;
        responseDescription?: string;
    }
    export interface ValidateCustomerInformationRequestDto {
        paymentCode?: string;
        customerId?: string;
    }
    export interface ValidateOtpRequest {
        mobile?: string;
        otp?: string;
    }
    export interface VirtualCardRequestDto {
        customerUniqueIdentifier?: string;
        city?: string;
        state?: string;
        productID?: number; // int32
        cardType?: string;
        email?: string;
        phoneNumber?: string;
        address?: string;
        name?: string;
        title?: string;
        gender?: string;
        wallet_ShortCode?: string;
    }
    export interface VirtualCardResponsetDto {
        status?: string;
        responseCode?: string;
        responseMessage?: string;
        data?: CardData;
    }
    export interface WalletFullDetailsResponse {
        message?: string;
        response?: string;
        responsedata?: {
        };
        data?: FullDetailsData;
        responseCode?: string;
        responseDescription?: string;
    }
    export interface WalletInterBankFTReq {
        amt?: string;
        toacct?: string;
        frmacct?: string;
        paymentRef?: string;
        remarks?: string;
        channelID?: number; // int32
        currencycode?: string;
        transferType?: number; // int32
        pin?: string;
        nipData?: NIPInterBankInsertDto;
    }
    export interface WalletToSterlingFTRef {
        ftReference?: string;
        responseCode?: string;
        responseDescription?: string;
    }
    export interface WalletToWalletFTReq {
        amt?: string;
        toacct?: string;
        frmacct?: string;
        paymentRef?: string;
        remarks?: string;
        channelID?: number; // int32
        currencycode?: string;
        transferType?: number; // int32
        pin?: string;
    }
    export interface WalletToWalletFTRes {
        message?: string;
        response?: string;
        responsedata?: {
        };
        data?: WalletTransferData;
        responseCode?: string;
        responseDescription?: string;
    }
    export interface WalletTransferData {
        sent?: boolean;
    }
    export interface WalletUserTransactionDetailsResponse {
        message?: string;
        response?: string;
        responsedata?: {
        };
        count?: number; // int32
        data?: TransactionDetails[];
        responseCode?: string;
        responseDescription?: string;
    }
}
