import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

interface OrderStatusDropdownProps {
  orderId: string;
  currentStatus: string;
  onChangeStatus: (orderId: string, newStatus: string) => void;
}

const statuses = ["ordered", "cooking", "packaging", "delivering", "delivered", "canceled"];

const OrderStatusDropdown: React.FC<OrderStatusDropdownProps> = ({
  orderId,
  currentStatus,
  onChangeStatus,
}) => {
  return (
    <Select
      label="Order Status"
      selectedKeys={[currentStatus]}
      className="w-full max-w-xs bg-[#1F2937] rounded-lg"
      onChange={(e) => onChangeStatus(orderId, e.target.value)}
      aria-label="Select Order Status"
      variant="bordered"
    >
      {statuses.map((status) => (
        <SelectItem key={status} value={status}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </SelectItem>
      ))}
    </Select>
  );
};

export default OrderStatusDropdown;
