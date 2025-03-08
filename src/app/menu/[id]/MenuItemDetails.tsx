"use client";

import { useContext, useState } from "react";
import Loader from "@/components/common/Loader";
import { CartContext } from "../../../util/ContextProvider";
import MenuItemAddOn from "@/types/MenuItemAddOn";
import MenuItemPopUp from "@/components/features/menuItems/MenuItemPopUp";
import { useSession } from "next-auth/react";
import { Button, Link } from "@nextui-org/react";

interface MenuItemDetailsProps {
  menuItem: {
    _id: string;
    name: string;
    description: string;
    image: string;
    basePrice: number;
    sizes: any[];
    extraIngredientsPrices: any[];
  } | null;
}

const MenuItemDetails = ({ menuItem }: MenuItemDetailsProps) => {
  const { data: session } = useSession();
  const { addToCart } = useContext(CartContext);
  const [showPopUp, setShowPopUp] = useState(false);

  if (!menuItem) return <div className="text-center text-red-500">Item not found!</div>;

  const hasOptions = menuItem.sizes.length > 0 || menuItem.extraIngredientsPrices.length > 0;

  function handleAddToCartClick() {
    if (hasOptions) {
      setShowPopUp(true);
    } else {
      addToCart(menuItem, null, []);
    }
  }

  async function handlePopUpAddToCart(
    item: any,
    selectedSize: MenuItemAddOn,
    selectedExtras: MenuItemAddOn[]
  ) {
    addToCart(item, selectedSize, selectedExtras);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setShowPopUp(false);
  }

  return (
    <section className="max-w-4xl mx-auto py-12">
      <div className="grid grid-cols-2 gap-6">
        <img src={menuItem.image} alt={menuItem.name} className="rounded-lg shadow-lg w-full h-96 object-cover" />
        <div>
          <h1 className="text-3xl font-bold">{menuItem.name}</h1>
          <p className="text-lg text-gray-500 mt-2">{menuItem.description}</p>
          <p className="text-2xl font-semibold text-primary mt-4">
            {hasOptions && <span>From: </span>}
            ${menuItem?.basePrice ? menuItem.basePrice.toFixed(2) : "N/A"}
          </p>

          <div className="mt-6 flex items-center gap-4">
            {session ? (
              <button
                className="border-2 bg-dark hover:bg-primary hover:text-dark rounded-full transition-all px-6 py-3"
                onClick={handleAddToCartClick}
              >
                Add to Cart
              </button>
            ) : (
              <Button as={Link} href="/login" radius="none" size="sm" className="bg-transparent border hover:bg-primary hover:text-dark">
                Order
              </Button>
            )}
          </div>
        </div>
      </div>

      {showPopUp && (
        <MenuItemPopUp
          menuItem={menuItem}
          setShowPopUp={setShowPopUp}
          onAdd={handlePopUpAddToCart}
        />
      )}
    </section>
  );
};

export default MenuItemDetails;
