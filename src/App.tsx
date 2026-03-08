import { useState } from "react";
import "./App.css";

import InvoiceForm from "./invoice/components/invoiceForm";
import InvoicePreview from "./invoice/components/invoicePreview";
import InvoiceData from "./invoice/types/invoiceData";

function App() {
  const [invoice, setInvoice] = useState<InvoiceData>({
    invoiceNumber: "P-01",
    date: new Date().toISOString().split("T")[0],
    billerName: { id: crypto.randomUUID(), name: "", identity: "", email: "" },
    clientName: { id: crypto.randomUUID(), name: "", email: "" },
    items: [
      {
        id: crypto.randomUUID(),
        description: "",
        cant: 1,
        unit_price: 0,
        discount: 0,
        subtotal: 0,
      },
    ],
    taxRate: 15,
  });

  return (
    <>
      <div className="absolute grid grid-cols-1 sm:grid-cols-2 inset-0">
        <div className=" bg-slate-700">
          <InvoiceForm invoice={invoice} setInvoice={setInvoice} />
        </div>
        <div className="bg-white">
          <InvoicePreview invoice={invoice}/>
        </div>
      </div>
    </>
  );
}

export default App;
