import axios from "axios";
import { Order } from "../../models/entities/order";
import { OrdersProvider } from "../../models/providers/orders.provider";
import { CreateOrderPayload } from "../../models/dto/create-order-payload";
import { UpdateOrderPayload } from "../../models/dto/update-order-payload";

const apiBaseUrl = 'http://localhost:8000';
const ordersUrl = `${apiBaseUrl}/orders/`;

export class HttpOrdersProvider implements OrdersProvider {
  async getAllOrders(): Promise<Order[]> {
    const result = await axios.get<Order[]>(ordersUrl);
    return result.data;
  }
  public async getOrder(id: number): Promise<Order> {
    const result = await axios.get<Order>(`${ordersUrl}${id}`);
    return result.data;
  }
  public async createOrder(data: CreateOrderPayload): Promise<Order> {
    const result = await axios.post<Order>(ordersUrl, data);
    return result.data;
  }
  public async updateOrder(id: number, data: UpdateOrderPayload): Promise<Order> {
    const result = await axios.put<Order>(`${ordersUrl}${id}`, data);
    return result.data;
  }
  public async deleteOrder(id: number): Promise<boolean> {
    const result = await axios.delete<boolean>(`${ordersUrl}${id}`);
    return result.data;
  }
}
