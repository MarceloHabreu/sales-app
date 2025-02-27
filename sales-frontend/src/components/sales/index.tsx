import { Sale } from "@/app/models/sales";
import { Layout } from "../layout";
import { SalesForm } from "./form";
import { useSaleService } from "@/app/services";
import { toast } from "react-toastify";
import { useState } from "react";
import { useUser } from "@/context/UserContext";

export const Sales: React.FC = () => {
    const service = useSaleService();
    const [saleCompleted, setSaleCompleted] = useState<boolean>(false);

    const { userId } = useUser();

    const handleSubmit = (sale: Sale) => {
        service
            .makingSale(sale, userId || "")
            .then(() => {
                toast.success("sale successfully completed");
                setSaleCompleted(true);
            })
            .catch(() => {
                toast.error("Something went wrong, try again later!");
            });
    };

    const handleNewSale = () => {
        setSaleCompleted(false);
    };
    return (
        <Layout title="Sales">
            <SalesForm onSubmit={handleSubmit} saleCompleted={saleCompleted} onNewSale={handleNewSale} />
        </Layout>
    );
};
