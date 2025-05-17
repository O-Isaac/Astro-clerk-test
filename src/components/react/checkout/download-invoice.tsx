import { stripe } from "@/utils/stripe";
import { toast } from "sonner"
import { useState } from "react";

const DownloadInvoice: React.FC<{ id: string }> = ({ id }) => {
    const [loading, setLoading] = useState(false);
   
    const downloadInvoice = async () => {
        setLoading(true);

        const session = await stripe.checkout.sessions.retrieve(id);

        if (session.invoice) {
            const invoice = await stripe.invoices.retrieve(session.invoice.toString());

            if (invoice.invoice_pdf) {
                window.open(invoice.invoice_pdf, "_blank");
            }
        } else {
            toast.error("No se encontro la factura")
        }

        setLoading(false);
    }

    return (
        <button disabled={loading} className="inline-block bg-teal-600 text-white px-6 py-3 rounded-2xl hover:bg-teal-700 transition" onClick={downloadInvoice}>{loading ? "Descargando..." : "Descargar Factura"}</button>
    )
}

export default DownloadInvoice;