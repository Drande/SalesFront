import { CreateOrderPayload } from "../dto/create-order-payload";
import { UpdateOrderPayload } from "../dto/update-order-payload";
import { Order } from "../entities/order";

export abstract class OrdersProvider {
  public abstract getAllOrders(): Promise<Order[]>;
  public abstract getOrder(id: number): Promise<Order>;
  public abstract createOrder(data: CreateOrderPayload): Promise<Order>;
  public abstract updateOrder(id: number, data: UpdateOrderPayload): Promise<Order>;
  public abstract deleteOrder(id: number): Promise<boolean>;
}