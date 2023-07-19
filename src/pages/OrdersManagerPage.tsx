import { useCallback, useEffect, useState } from 'react';
import { ordersProvider } from '../providers/orders/orders.provider';
import { Order } from '../models/entities/order';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import NewOrderDialog from '../components/NewOrderDialog';
import { CreateOrderPayload } from '../models/dto/create-order-payload';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';

const initialOrders: Order[] = [];

const OrdersManagerPage = () => {
  
  const [orders, setOrders] = useState(initialOrders);
  const [displayAddOrderDialog, setDisplayAddOrderDialog] = useState(false);

  const loadOrders = () => {
    ordersProvider.getAllOrders().then(serverOrders => {
      setOrders(serverOrders);
    }).catch(error => {
      console.error(error);
    });
  };

  useEffect(loadOrders, []);

  const deleteOrder = useCallback((id: number) => {
    ordersProvider.deleteOrder(id).then(result => {
      if(result) {
        loadOrders();
      }
    }).catch(error => {
      console.error(error);
    });
  }, []);

  const createOrder = useCallback((payload: CreateOrderPayload) => {
    ordersProvider.createOrder(payload).then(_ => {
      loadOrders();
    }).catch(error => {
      console.error(error);
    });
  }, []);

  const TableActions = (orderRow: Order) => {
    return (
      <div className={"flex flex-row gap-2"}>
        <Button className={"p-button-text p-button-rounded p-button-danger"} icon={"pi pi-trash"} onClick={() => deleteOrder(orderRow.id)}></Button>
      </div>
    );
  }

  const header = () => {
    return (
      <div className={"flex flex-row gap-2 justify-content-between align-items-center"}>
        <span>Sales orders</span>
        <Button icon={"pi pi-plus"} onClick={() => setDisplayAddOrderDialog(true)}>Add order</Button>
      </div>
    );
  };

  const detailsEditor = (options: any) => {
    return <InputText value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
  };

  const totalEditor = (options: any) => {
    return <InputNumber value={options.value} onChange={(e) => options.editorCallback(e.value)}  mode="currency" currency="USD" locale="en-US" />;
  };

  const onRowEditComplete = (e: any) => {
    const newData: Order = e.newData;
    const { id, createdAt, updatedAt, deletedAt, ...data } = newData;
    ordersProvider.updateOrder(id, data).then(_ => {
      loadOrders();
    }).catch(error => {
      console.error(error);
    });
  };

  return (
    <>
      <DataTable header={header} editMode={"row"} onRowEditComplete={onRowEditComplete} rows={20} size={"normal"} paginator={true} value={orders} tableStyle={{ minWidth: '50rem' }}>
        <Column field="id" header="Id"></Column>
        <Column field="details" header="Details" editor={(options) => detailsEditor(options)}></Column>
        <Column field="total" header="Total" editor={(options) => totalEditor(options)}></Column>
        <Column field="createdAt" header="Created at"></Column>
        <Column field="updatedAt" header="Last update"></Column>
        <Column header="Actions" body={TableActions}></Column>
        <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
      </DataTable>
      <NewOrderDialog visible={displayAddOrderDialog} onHide={() => setDisplayAddOrderDialog(false)} onSubmit={createOrder}></NewOrderDialog>
    </>
  );
}

export default OrdersManagerPage