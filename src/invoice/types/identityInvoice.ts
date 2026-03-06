// ENUMS

enum TYPE_VOUCHER {
  FACTURA,
  CREDITO_FISCAL,
}

interface IdentityInvoice {
  id: string;
  code: string;
  create_at: string;
  type_voucher: TYPE_VOUCHER;
}

export default IdentityInvoice;
