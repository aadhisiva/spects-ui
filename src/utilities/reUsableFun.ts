// import CryptoJS from "crypto";

let method = "aes-256-cbc";

const KEY = "MTY2NzM5MDQwNCU3RTE2NjczOTA0MDQlN0UxNjY3MzkwNDA0";
const IV = "1306199325031987";

export const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
