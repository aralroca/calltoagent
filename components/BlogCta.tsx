import Link from "next/link";

export default function BlogCta({ locale }: { locale: string }) {
  const isEs = locale === "es";

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-2xl p-8 md:p-12 text-center text-white">
      <h3 className="text-2xl md:text-3xl font-extrabold mb-4">
        {isEs
          ? "¿Listo para reemplazar tu centralita?"
          : "Ready to replace your call center?"}
      </h3>
      <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
        {isEs
          ? "Prueba un agente de voz con IA que reserva citas, consulta bases de datos y resuelve incidencias — 24/7."
          : "Try an AI voice agent that books appointments, queries databases, and resolves issues — 24/7."}
      </p>
      <Link
        href={`/${locale}#pricing`}
        className="inline-block bg-white text-indigo-600 font-bold px-8 py-3 rounded-full hover:bg-slate-100 transition-colors"
      >
        {isEs ? "Ver precios y solicitar demo" : "See pricing & request demo"}
      </Link>
    </div>
  );
}
