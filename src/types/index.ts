export const PropToName = <const> {
    type: "Type",
    whoPays: "Who pays",
    phoneNumber: "Phone number",
    lastName: "Last name",
    firstName: "First name",
    middleName: "Middle name",
    settlement: "Settlement",
    destination: "Destination",
    basket: "Basket",
    price: "Price"
}

// export enum NameToProp {
//     "Type" = "type",
//     "Who pays" = "whoPays",
//     "Phone number" = "phoneNumber",
//     "Last name" = "lastName",
//     "First name" = "firstName",
//     "Middle name" = "middleName",
//     "Settlement" = "settlement",
//     "Destination" = "destination",
//     "Basket" = "basket",
//     "Price" = "price"
// }

export interface BillingData {
    type: SelectData,
    whoPays: SelectData
}

export interface CostumerData {
    phoneNumber: string,
    lastName: string,
    middleName: string,
    firstName: string
}

export interface MailData {
    destination: SelectData,
    settlement: SelectData,
    scanSheet: string
}

export interface OrderData {
    basket: {
        amount: number,
        name: string,
        packaging: number,
        productId: number, 
        unit: string
    }[],
    data: {
        id: number,
        img: string,
        isOpened: boolean,
        name: string,
        packaging: Record<number, number>,
        type: string,
        unit: string
    }[],
    price: number | string
}

export interface DataToSend {
    basket?: OrderData["basket"][],
    price?: OrderData["price"],
    phoneNumber?: CostumerData["phoneNumber"],
    lastName?: CostumerData["lastName"],
    firstName?: CostumerData["firstName"],
    middleName?: CostumerData["middleName"],
    settlement?: MailData["settlement"],
    destination?: MailData["destination"],
    scanSheet?: MailData["scanSheet"]
    type?: BillingData["type"],
    whoPays?: BillingData["whoPays"]
}

export interface MainData {
    orderData?: OrderData,
    costumerData?: CostumerData,
    mailData?: MailData,
    billingData?: BillingData
}

export interface SelectData {
    data: SelectForm[],
    selected: SelectForm | {}
}

export interface SelectForm {
    id: number | string,
    name: string,
    description?: string
}

export interface AddressGetWarehousesResponse {
    SiteKey: string,
    Description: string,
    ShortAddress: string,
    Phone: string,
    TypeOfWarehouse: string,
    Ref: string,
    Number: string,
    CityRef: string,
    CityDescription: string,
    SettlementRef: string,
    SettlementDescription: string,
    SettlementAreaDescription: string,
    SettlementRegionsDescription: string,
    SettlementTypeDescription: string,
    Longitude: number,
    Latitude: number,
    PostFinance: "1" | "0",
    BicycleParking: "1" | "0",
    PaymentAccess: "1" | "0",
    POSTerminal: "1" | "0",
    InternationalShipping: "1" | "0",
    SelfServiceWorkplacesCount: "1" | "0",
    TotalMaxWeightAllowed: string,
    PlaceMaxWeightAllowed: string,
    // SendingLimitationsOnDimensions: Dimensions,
    // ReceivingLimitationsOnDimensions: Dimensions,
    // Reception: Week,
    // Delivery: Week,
    // Schedule: Week,
    DistrictCode: string,
    WarehouseStatus: "Working" | string,
    WarehouseStatusDate: string,
    CategoryOfWarehouse: string,
    RegionCity: string,
    WarehouseForAgent: "1" | "0",
    MaxDeclaredCost: string,
    DenyToSelect: "1" | "0",
    PostMachineType: "None" | "FullDayService" | "PartTime" | "ForResidentOfEntrance" | "Private" | "LimitedAccess",
    PostalCodeUA: string,
    OnlyReceivingParcel: "1" | "0",
    WarehouseIndex: string
}

export interface AddressSearchSettlements {
    TotalCount: string,
    Addresses: {
        Warehouses: string,
        MainDescription: string,
        Area: string,
        Region: string,
        SettlementTypeCode: string,
        Ref: string,
        DeliveryCity: string,
        ParentRegionTypes: string,
        ParentRegionCode: string,
        RegionTypesCode: string
    }[],
    Warehouses: string,
    MainDescription: string,
    Area: string,
    Region: string,
    SettlementTypeCode: string,
    Ref: string,
    DeliveryCity: string
}

export interface CounterpartyGetCounterpartyContactPersonsResponse {
    Description: string,
    Ref: string,
    Phones: string,
    Email: string,
    LastName: string,
    FirstName: string,
    MiddleName: string
}

export interface CounterpartyGetCounterpartiesResponse {
    Description: string,
    Ref: string,
    City: string,
    Counterparty: string,
    FirstName: string,
    LastName: string,
    MiddleName: string,
    OwnershipFormRef: string,
    OwnershipFormDescription: string,
    EDRPOU: string,
    CounterpartyType: string
}

export interface Telegram {
    WebApp: WebApp
}

export interface WebApp {
    version: string,
    MainButton: {
        text: string,
        setText: (text: string) => void,
        onClick: (callback: () => void) => void,
        show: () => void
    },
    ready: () => Promise<void>,
    onEvent: (eventType: WebAppEvents, eventHandler: () => void) => void,
    offEvent: (eventType: WebAppEvents, eventHandler: () => void) => void,
    sendData: (data: string) => void,
    showAlert: (message: string, callback?: () => void) => Promise<void>
}

type WebAppEvents = "themeChanged" | "viewportChanged" | "mainButtonClicked" | "backButtonClicked" | "settingsButtonClicked" | "invoiceClosed" | "popupClosed" 

export interface Query {
    token: string,
    orderData: {
        data: {
            name: string,
            type: string,
            packaging: Record<number, number>,
            unit: string,
            img: string
        }[],
        basket: {
            id: number,
            packaging: number,
            amount: number
        }[],
        price: number
    },
    costumerData: {
        phoneNumber: string,
        lastName: string,
        firstName: string,
        middleName: string
    },
    mailData: {
        settlement: {
            data: [],
            selected: string
        },
        destination: {
            data: [],
            selected: string
        },
        scanSheet: string
    },
    billingData: {
        type: {
            data: [],
            selected: string
        },
        whoPays: {
            data: [],
            selected: string
        },
    }
}