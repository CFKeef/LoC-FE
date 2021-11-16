export interface SearchForm {
    query: string;
    location: string;
    subject: string;
    originalFormat: string;
    partOf: string;
    contributor: string;
}

type SearchActions = {
    type: "TEXTFIELD";
    payload: {
        field: string;
        value: string;
    };
};

const searchReducer = (state: SearchForm, action: SearchActions) => {
    switch (action.type) {
        case "TEXTFIELD": {
            const { field, value } = action.payload;

            return {
                ...state,
                [field]: value,
            };
        }
        default:
            return state;
    }
};

export default searchReducer;
