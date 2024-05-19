import {
    LayoutDashboard,
    Shapes,
    ShoppingBag,
    Tag,
    UsersRound,
  } from "lucide-react";
  
  export const navLinks = [
    {
      url: "/",
      icon: <LayoutDashboard />,
      label: "Admin",
    },
    {
      url: "/collections",
      icon: <Shapes />,
      label: "Kolleksiyalar",
    },
    {
      url: "/products",
      icon: <Tag />,
      label: "Məhsullar",
    },
    {
      url: "/orders",
      icon: <ShoppingBag />,
      label: "Sifarişlər",
    },
    {
      url: "/customers",
      icon: <UsersRound />,
      label: "Müştərilər",
    },
  ];