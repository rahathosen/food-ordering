interface OrderSummaryProps {
  orderId?: string;
  subtotal: number;
  deliveryFee: number; // Corrected spelling
  discount: number;
  paid: boolean;
}

const OrderSummary = ({
  orderId,
  subtotal,
  deliveryFee,
  discount,
  paid,
}: OrderSummaryProps) => {
  const total = subtotal + deliveryFee - discount; // Ensure discount is subtracted
  return (
    <>
      <div className="grid grid-cols-8 pt-2">
        <div className="pl-4 col-span-7 flex justify-between font-semibold">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
      </div>
      <div className="grid grid-cols-8 pt-1">
        <div className="pl-4 col-span-7 flex justify-between text-gray-400">
          <span>Delivery fee</span>
          <span>${deliveryFee.toFixed(2)}</span> {/* Corrected prop usage */}
        </div>
      </div>
      <div className="grid grid-cols-8 pt-1 pb-2 border-b border-dashed">
        <div className="pl-4 col-span-7 flex justify-between text-gray-400">
          <span>Discount</span>
          <span>-${discount.toFixed(2)}</span>
        </div>
      </div>
      <div className="grid grid-cols-8 pt-2">
        <div className="pl-4 col-span-7 flex justify-between font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      {orderId && (
        <div className="grid grid-cols-8 pt-1">
          <div className="pl-4 col-span-7 flex justify-between font-semibold">
            <span>Amount Paid</span>
            <span>${paid ? total.toFixed(2) : "0.00"}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderSummary;
