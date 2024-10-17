import * as Yup from 'yup';

const defaultMessage = "Должно быть заполнено";
    
export const carDealershipSchema = Yup.object().shape({
    id: Yup.string().default(""),
    name: Yup.string().matches(/^[А-Яа-яA-Za-z0-9\s_-]+$/, "Без знаков препинания и чисел").max(200, 'Максимум 200 символов').required(defaultMessage).default(undefined),
    productsCounter: Yup.string().matches(/^(?:[1-9]|0[1-9]|1[0-9]|20)$/, "Максимум число 20").required(defaultMessage).default(undefined),
    productTypes: Yup.array().required(defaultMessage).min(1).default([]),
});