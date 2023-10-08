// Define your initial state
const AddNewBusinessInitialState = {
    businessName: "",
    businessType: [],
    businessCategory: {
        category: "",
        subcategory: []
    },
    businessAddress: {
        country: '',
        street: '',
        city: '',
        pincode: '',
        state: ''
    },
    businessContact: {
        phoneNumber: '',
        website: ''
    },
    businessWorkingHours: {
        sunday: {
            isOpen: false,
            opens: '',
            closes: ''
        },
        monday: {
            isOpen: false,
            opens: '',
            closes: ''
        },
        tuesday: {
            isOpen: false,
            opens: '',
            closes: ''
        },
        wednesday: {
            isOpen: false,
            opens: '',
            closes: ''
        },
        thursday: {
            isOpen: false,
            opens: '',
            closes: ''
        },
        friday: {
            isOpen: false,
            opens: '',
            closes: ''
        },
        saturday: {
            isOpen: false,
            opens: '',
            closes: ''
        },
    },
    businessDescription: '',
    businessImages: [],
    isVerified: false
};

// Define action types
const SET_BUSINESS_NAME = 'SET_BUSINESS_NAME';
const SET_BUSINESS_TYPE = 'SET_BUSINESS_TYPE';
const SET_BUSINESS_CATEGORY = 'SET_BUSINESS_CATEGORY';
const SET_BUSINESS_ADDRESS = 'SET_BUSINESS_ADDRESS';
const SET_BUSINESS_CONTACT = 'SET_BUSINESS_CONTACT';
const SET_BUSINESS_WORKING_HOURS = 'SET_BUSINESS_WORKING_HOURS';
const SET_BUSINESS_DESCRIPTION = 'SET_BUSINESS_DESCRIPTION';
const SET_IMAGES = 'SET_IMAGES'
const SET_CLEAR = 'SET_CLEAR'

// Create your reducer function
const addNewBusinessReducer = (state, action) => {
    switch (action.type) {
        case SET_BUSINESS_NAME:
            return { ...state, businessName: action.payload };
        case SET_BUSINESS_TYPE:
            return { ...state, businessType: [...action.payload] };
        case SET_BUSINESS_CATEGORY:
            return { ...state, businessCategory: action.payload };
        case SET_BUSINESS_ADDRESS:
            return { ...state, businessAddress: { ...action.payload } };
        case SET_BUSINESS_CONTACT:
            return { ...state, businessContact: { ...action.payload } };
        case SET_BUSINESS_WORKING_HOURS:
            return { ...state, businessWorkingHours: { ...action.payload } };
        case SET_BUSINESS_DESCRIPTION:
            return { ...state, businessDescription: action.payload };
        case SET_IMAGES:
            return { ...state, businessImages: [...action.payload] };
        case SET_CLEAR:
            return {...action.payload}
        default:
            return state;
    }
};

export {
    AddNewBusinessInitialState,
    SET_BUSINESS_NAME,
    SET_BUSINESS_TYPE,
    SET_BUSINESS_CATEGORY,
    SET_BUSINESS_ADDRESS,
    SET_BUSINESS_CONTACT,
    SET_BUSINESS_WORKING_HOURS,
    SET_BUSINESS_DESCRIPTION,
    SET_IMAGES,
    SET_CLEAR,
    addNewBusinessReducer,
};
