export const APP_NAME = 'Social-Media'

export const PASSWORD_REGEX = /(?=[A-Za-z0-9@#$%^&+!=\\/\]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&<>*~.:+`-])(?=.{10,}).*$/g

export const MEDIA_LIMIT = 5

export const PAGINATION_INIT = {
    per_page: 10,
    page_no: 0,
    search: ''
};