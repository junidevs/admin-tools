import * as yup from 'yup';
// import { __ } from '../helpers/i18n';
// import { checkPassword } from '../helpers/yupValidators';

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .required('error.fieldIsRequired'),

    pass: yup
        .string()
        .required(),
});
