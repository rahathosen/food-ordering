import MenuItem from "@/types/MenuItem";
import { useContext, useState } from "react";
import { CartContext } from "../../../util/ContextProvider";
import MenuItemAddOn from "@/types/MenuItemAddOn";
import MenuItemPopUp from "./MenuItemPopUp";
import { useSession } from "next-auth/react";
import { Button, Link } from "@nextui-org/react";
import NextLink from "next/link";

interface MenuItemCardProps {
  menuItem: MenuItem;
}

const MenuItemCard = ({ menuItem }: MenuItemCardProps) => {
  const { data: session } = useSession();
  const { addToCart } = useContext(CartContext);
  const [showPopUp, setShowPopUp] = useState(false);
  const hasSizesOrExtras = menuItem.sizes.length > 0 || menuItem.extraIngredientsPrices.length > 0;

  function handleAddToCartClick() {
    const hasOptions = menuItem.sizes.length > 0 || menuItem.extraIngredientsPrices.length > 0;
    if (hasOptions) {
      setShowPopUp(true);
    } else {
      addToCart(menuItem, null, []);
    }
  }

  async function handlePopUpAddToCart(item: MenuItem, selectedSize: MenuItemAddOn, selectedExtras: MenuItemAddOn[]): Promise<void> {
    addToCart(item, selectedSize, selectedExtras);
    await new Promise(resolve => setTimeout(resolve, 800));
    setShowPopUp(false);
  }

  return (
    <>
      <div className="flex flex-col gap-3 justify-center text-center items-center">
        {/* ✅ Clickable Image & Name - Links to Details Page */}
        <NextLink href={`/menu/${menuItem._id}`} passHref>
          <div 
            style={{ 
              backgroundImage: `url(${menuItem.image || "/placeholder.jpg"})`, 
              borderRadius: "50%" 
            }} 
            className="bg-cover bg-center bg-no-repeat mb-4 w-[200px] h-[200px] cursor-pointer transition hover:scale-105"
          />
        </NextLink>

        <div className="flex flex-col gap-4">
          <NextLink href={`/menu/${menuItem._id}`} passHref>
            <h3 className="cursor-pointer hover:text-primary transition">{menuItem.name}</h3>
          </NextLink>

          <p className="text-gray-400 line-clamp-3">{menuItem.description}</p>

          <div className="flex items-center justify-center gap-6">
            <p className="text-primary">
              {hasSizesOrExtras && <span>From: </span>}
              ${(menuItem.basePrice as number).toFixed(2)}
            </p>

            {session ? (
              <button
                className="border-2 bg-dark hover:bg-primary hover:text-dark rounded-full transition-all whitespace-nowrap px-4 py-2"
                onClick={handleAddToCartClick}
              >
                Add to cart
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
          onAdd={(item: MenuItem, selectedSize: MenuItemAddOn, selectedExtras: MenuItemAddOn[]) => handlePopUpAddToCart(item, selectedSize, selectedExtras)}
        />
      )}
    </>
  );
};

export default MenuItemCard;
