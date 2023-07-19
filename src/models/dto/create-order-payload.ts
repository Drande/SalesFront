import * as yup from 'yup';

export interface CreateOrderPayload {
  details: string;
  total: number;
}

export const CreateOrderSchema = yup.object().shape({
  details: yup.string()
    .min(2, 'The field should be at last two characters long')
    .max(200, 'The field has a max length of 200 characters')
    .required('Required'),
    total: yup.number()
    .min(0, 'Cant be lower than zero')
    .required('Required'),
});