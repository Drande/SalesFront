import { Dialog } from 'primereact/dialog';
import React from 'react';
import { Formik, Form } from 'formik';
import { CreateOrderPayload, CreateOrderSchema } from '../models/dto/create-order-payload';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { InputNumber } from 'primereact/inputnumber';

interface NewOrderDialogProps {
  visible?: boolean;
  onHide: () => void;
  onSubmit: (payload: CreateOrderPayload) => void;
}

const initialValues: CreateOrderPayload = {
  details: '',
  total: 0
}

const NewOrderDialog: React.FC<NewOrderDialogProps> = ({ visible, onHide, onSubmit }) => {
  return (
    <Dialog visible={visible} onHide={onHide} header={"Add new order"}>
      <div className={"flex flex-column gap-4 align-items-center"}>
        <Formik
          initialValues={initialValues}
          validationSchema={CreateOrderSchema}
          onSubmit={values => {
            onHide();
            onSubmit(values);
          }}
        >
          {({ errors, touched, handleChange, values }) => (
            <Form className={"flex flex-column gap-2"}>
              <label htmlFor="details">Details</label>
              <InputText name="details"
                value={values.details}
                onChange={(e) => {
                  handleChange("details")(e);
                }}
                className={classNames({ 'p-invalid': errors.details })}
              />
              {errors.details && touched.details ? ( <div>{errors.details}</div> ) : null}
              <label htmlFor="total">Total</label>
              <InputNumber name="total" mode="currency" currency="USD" locale="en-US"
                value={values.total}
                onChange={(e) => {;
                  handleChange("total")(e.value?.toString() ?? "");
                }}
                className={classNames({ 'p-invalid': errors.total })}
              />
              {errors.total && touched.total ? ( <div>{errors.total}</div> ) : null}
              <Button type="submit">Submit</Button>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
}

export default NewOrderDialog;
