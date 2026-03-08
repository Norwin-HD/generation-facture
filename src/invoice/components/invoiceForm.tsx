import DetailProducts from "../types/detailProducts";
import InvoiceData from "../types/invoiceData";

interface Props {
  invoice: InvoiceData;
  setInvoice: (data: InvoiceData) => void;
}

export default function InvoiceForm({ invoice, setInvoice }: Props) {
  const createEmptyProduct = (): DetailProducts => ({
    id: crypto.randomUUID(),
    description: "",
    cant: 1,
    unit_price: 0,
    discount: 0,
    subtotal: 0,
  });

  const updateClient = (field: string, value: string) => {
    setInvoice({
      ...invoice,
      clientName: { ...invoice.clientName, [field]: value },
    });
  };

  const updateIssuer = (field: string, value: string) => {
    setInvoice({
      ...invoice,
      billerName: { ...invoice.billerName, [field]: value },
    });
  };

  const updateProduct = (
    id: string,
    field: keyof DetailProducts,
    value: string | number,
  ) => {
    setInvoice({
      ...invoice,
      items: invoice.items.map((product) =>
        product.id === id ? { ...product, [field]: value } : product,
      ),
    });
  };

  function addProducts() {
    setInvoice({
      ...invoice,
      items: [...invoice.items, createEmptyProduct()],
    });
  }

  const removeProduct = (id: string) => {
    const filteredItems = invoice.items.filter(
      (product: DetailProducts) => product.id !== id,
    );

    setInvoice({
      ...invoice,
      items: filteredItems.length > 0 ? filteredItems : [createEmptyProduct()],
    });
  };

  return (
    <div className="mt-5 p-6">
      <form className="flex flex-col gap-4">
        {/* FORMULARIO CLIENTE */}
        <div className="">
          <h3 className="text-xl font-bold">DATOS DEL CLIENTE</h3>
          <div className="flex flex-col gap-4">
            <label htmlFor="">Nombre completo: </label>
            <input
              type="text"
              id="clientName"
              value={invoice.clientName.name}
              onChange={(e) => updateClient("name", e.target.value)}
              className="border border-slate-300 rounded-md p-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Escribe el nombre"
            />
            <label htmlFor="">Email: </label>
            <input
              type="email"
              id="clientEmail"
              value={invoice.clientName.email}
              placeholder="Escribe el email"
              onChange={(e) => updateClient("email", e.target.value)}
              className="border border-slate-300 rounded-md p-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        {/* FORMULARIO EMISOR */}
        <div className="">
          <h3 className="text-xl font-bold">DATOS DEL EMISOR</h3>
          <div className="flex flex-col gap-4">
            <label htmlFor="">Nombre completo: </label>
            <input
              type="text"
              id="nameEmisor"
              value={invoice.billerName.name}
              onChange={(e) => updateIssuer("name", e.target.value)}
              className="border border-slate-300 rounded-md p-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Escribe el nombre"
            />
            <label htmlFor="">Identificación: </label>
            <input
              type="text"
              id="emisorIdentity"
              value={invoice.billerName.identity}
              onChange={(e) => updateIssuer("identity", e.target.value)}
              placeholder="Escribe su identificacion"
              className="border border-slate-300 rounded-md p-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <label htmlFor="">Email: </label>
            <input
              type="email"
              id="emisorEmail"
              value={invoice.billerName.email}
              onChange={(e) => updateIssuer("email", e.target.value)}
              placeholder="Escribe el email"
              className="border border-slate-300 rounded-md p-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        {/* FORMULARIO PRODUCTO */}
        <div className="mt-6 p-6 bg-slate-50 rounded-lg border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 border-b pb-2 mb-4">
            SECCIÓN PRODUCTOS
          </h3>

          <div className="hidden md:grid grid-cols-12 gap-4 mb-2 text-sm font-semibold text-slate-600">
            <div className="col-span-5">Descripción</div>
            <div className="col-span-2">Cant.</div>
            <div className="col-span-2">Precio U.</div>
            <div className="col-span-2">Desc. %</div>
            <div className="col-span-1 text-center">Acción</div>
          </div>
          <div className="flex flex-col gap-3">
            {invoice.items.map((product: DetailProducts) => {
              const subtotal =
                product.cant *
                product.unit_price *
                (1 - product.discount / 100);

              return (
                <div
                  key={product.id}
                  className="grid grid-cols-1 md:grid-cols-13 gap-4 items-center bg-white p-3 md:p-0 rounded border md:border-none border-slate-200"
                >
                  <div className="col-span-5">
                    <input
                      type="text"
                      value={product.description}
                      placeholder="Ej. Memoria RAM 16GB"
                      onChange={(e) =>
                        updateProduct(product.id, "description", e.target.value)
                      }
                      className="w-full border border-slate-300 rounded p-2 focus:outline-none focus:border-blue-500 text-black"
                    />
                  </div>

                  <div className="col-span-2">
                    <input
                      type="number"
                      min="1"
                      value={product.cant}
                      onChange={(e) =>
                        updateProduct(
                          product.id,
                          "cant",
                          Number(e.target.value),
                        )
                      }
                      className="w-full border border-slate-300 rounded p-2 focus:outline-none focus:border-blue-500 text-black"
                    />
                  </div>

                  <div className="col-span-2">
                    <input
                      type="number"
                      value={product.unit_price}
                      min="0"
                      step="0.01"
                      onChange={(e) =>
                        updateProduct(
                          product.id,
                          "unit_price",
                          Number(e.target.value),
                        )
                      }
                      className="w-full border border-slate-300 rounded p-2 focus:outline-none focus:border-blue-500 text-black"
                    />
                  </div>

                  <div className="col-span-3 md:col-span-3 flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={product.discount}
                      onChange={(e) =>
                        updateProduct(
                          product.id,
                          "discount",
                          Number(e.target.value),
                        )
                      }
                      className="w-full border border-slate-300 rounded p-2 focus:outline-none focus:border-blue-500 text-black"
                    />
                    <span className="text-sm font-bold text-slate-700 w-full text-right">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="col-span-1 flex justify-center">
                    <button
                      type="button"
                      onClick={() => removeProduct(product.id)}
                      className="text-red-500 hover:text-red-700 font-bold p-2 ml-4"
                      title="Eliminar fila"
                    >
                      X
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={addProducts}
            className="mt-4 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            + Agregar Producto
          </button>
        </div>
      </form>
    </div>
  );
}
