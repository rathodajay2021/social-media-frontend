export const APP_NAME = 'Social-Media';

export const PASSWORD_REGEX =
    /(?=[A-Za-z0-9@#$%^&+!=\\/\]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&<>*~.:+`-])(?=.{10,}).*$/g;

export const EMAIL_REGEX = /^(?!.{81})(?:\w+[.-])*\w{1,50}@\w{1,25}(?:[.-]\w+)*\.\w{2,3}$/;

export const PHONE_REGEX = /^\+?(\d{16}|\d{10,12})/;

export const MEDIA_LIMIT = 5;

export const PAGINATION_INIT = {
    perPage: 10,
    pageNo: 0,
    search: ''
};
