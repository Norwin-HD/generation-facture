import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import InvoiceData from "../types/invoiceData";

interface Props {
  invoice: InvoiceData;
}

const InvoicePreview = ({ invoice }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const formattedDate = new Date(invoice.date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const validItems = invoice.items.filter(
    (item) =>
      item.description.trim() !== "" ||
      item.cant > 0 ||
      item.unit_price > 0 ||
      item.discount > 0,
  );

  const subtotal = validItems.reduce((acc, item) => {
    const lineTotal = item.cant * item.unit_price * (1 - item.discount / 100);
    return acc + lineTotal;
  }, 0);

  const taxAmount = subtotal * (invoice.taxRate / 100);
  const total = subtotal + taxAmount;

  const toMoney = (value: number) =>
    new Intl.NumberFormat("es-NI", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: `factura-${invoice.invoiceNumber}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 14mm;
      }

      @media print {
        body {
          margin: 0;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
  });

  return (
    <div className="h-full bg-slate-100 p-4 md:p-6">
      <div className="mb-4 flex justify-end print:hidden">
        <button
          type="button"
          onClick={reactToPrintFn}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Imprimir
        </button>
      </div>

      <div
        ref={contentRef}
        className="mx-auto w-full max-w-[794px] bg-white p-6 text-slate-900 shadow-lg md:p-10"
      >
        <header className="mb-8 flex items-start justify-between border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight">FACTURA</h1>
            <p className="mt-1 text-sm text-slate-500">
              Numero: {invoice.invoiceNumber}
            </p>
          </div>
          <div className="text-sm text-slate-600">
            <p>Fecha: {formattedDate}</p>
          </div>
        </header>

        <section className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
              Emitido por
            </h2>
            <p className="font-semibold">
              {invoice.billerName.name || "Sin nombre"}
            </p>
            <p className="text-sm text-slate-600">
              ID: {invoice.billerName.identity || "Sin identificacion"}
            </p>
            <p className="text-sm text-slate-600">
              {invoice.billerName.email || "Sin email"}
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
              Facturar a
            </h2>
            <p className="font-semibold">
              {invoice.clientName.name || "Sin nombre"}
            </p>
            <p className="text-sm text-slate-600">
              {invoice.clientName.email || "Sin email"}
            </p>
          </div>
        </section>

        <section>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-300 text-left text-slate-500">
                <th className="py-2 font-semibold">Descripcion</th>
                <th className="py-2 text-right font-semibold">Cant.</th>
                <th className="py-2 text-right font-semibold">Precio U.</th>
                <th className="py-2 text-right font-semibold">Desc.</th>
                <th className="py-2 text-right font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {validItems.length > 0 ? (
                validItems.map((item) => {
                  const lineTotal =
                    item.cant * item.unit_price * (1 - item.discount / 100);

                  return (
                    <tr key={item.id} className="border-b border-slate-200">
                      <td className="py-3">{item.description || "Producto"}</td>
                      <td className="py-3 text-right">{item.cant}</td>
                      <td className="py-3 text-right">{toMoney(item.unit_price)}</td>
                      <td className="py-3 text-right">{item.discount}%</td>
                      <td className="py-3 text-right">{toMoney(lineTotal)}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-slate-400">
                    No hay productos agregados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        <section className="mt-8 ml-auto w-full max-w-xs space-y-2 text-sm">
          <div className="flex items-center justify-between text-slate-600">
            <span>Subtotal</span>
            <span>{toMoney(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span>Impuesto ({invoice.taxRate}%)</span>
            <span>{toMoney(taxAmount)}</span>
          </div>
          <div className="flex items-center justify-between border-t border-slate-300 pt-2 text-base font-bold">
            <span>Total</span>
            <span>{toMoney(total)}</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default InvoicePreview;
