import Client from "./client";
import DetailProducts from "./detailProducts";
import Issuer from "./issuer";

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  billerName: Issuer[];
  clientName: Client[];
  items: DetailProducts[];
  taxRate: number;
}

export default InvoiceData;
