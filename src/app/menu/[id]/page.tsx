import { Metadata } from "next";
import MenuItemDetails from "./MenuItemDetails";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/menu-items/${params.id}`);
  const menuItem = res.ok ? await res.json() : null;

  if (!menuItem) {
    return {
      title: "Item Not Found",
      description: "This menu item does not exist.",
    };
  }

  return {
    title: `${menuItem.name} - Delicious Menu Item`,
    description: menuItem.description,
    openGraph: {
      title: menuItem.name,
      description: menuItem.description,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/menu/${params.id}`,
      images: [
        {
          url: menuItem.image,
          width: 1200,
          height: 630,
          alt: menuItem.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: menuItem.name,
      description: menuItem.description,
      images: [menuItem.image],
    },
  };
}

const Page = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/menu-items/${params.id}`);
  const menuItem = res.ok ? await res.json() : null;

  return <MenuItemDetails menuItem={menuItem} />;
};

export default Page;
