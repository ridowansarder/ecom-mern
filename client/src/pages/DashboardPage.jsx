import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import AnalyticsTab from "../components/AnalyticsTab";
import { useProductStore } from "../store/useProductStore";

const tabs = [
  { id: "products", label: "Products", icon: ShoppingBasket },
  { id: "analytics", label: "Analytics", icon: BarChart },
  { id: "create", label: "Create Product", icon: PlusCircle },
];

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("products");
  const { getProducts } = useProductStore();

  useEffect(() => {
    getProducts();
  }, [getProducts]);
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 my-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>
        <div className="flex max-sm:flex-col sm:flex-row gap-4 sm:gap-0 items-center justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center max-w-md px-4 py-2 mx-2 rounded-md transition-colors duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-orange-500 text-white"
                  : "bg-gray-50 border border-gray-300 text-gray-900 hover:bg-gray-100"
              }`}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === "create" && <CreateProductForm />}
        {activeTab === "products" && <ProductsList />}
        {activeTab === "analytics" && <AnalyticsTab />}
      </div>
    </div>
  );
};

export default DashboardPage;
