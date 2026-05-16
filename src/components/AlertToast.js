import { useEffect } from "react";

function AlertToast({ alert, onClose }) {
  useEffect(() => {
    if (!alert) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [alert, onClose]);

  if (!alert) {
    return null;
  }

  const toneClassName =
    alert.type === "error"
      ? "border-rose-200/60 bg-rose-100/70 text-rose-900"
      : "border-emerald-200/60 bg-emerald-100/70 text-emerald-950";

  const icon = alert.type === "error" ? (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9l6 6" />
      <path d="M15 9l-6 6" />
    </svg>
  ) : (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.5 2.5L16 9.5" />
    </svg>
  );

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div
        className={`pointer-events-auto relative w-full max-w-md overflow-hidden rounded-[1.75rem] border px-5 py-4 shadow-2xl backdrop-blur-xl ${toneClassName}`}
        role="alert"
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.55),rgba(255,255,255,0.08))]" />
        <div className="absolute -top-10 right-6 h-24 w-24 rounded-full bg-white/35 blur-2xl" />
        <div className="flex items-start justify-between gap-4">
          <div className="relative flex items-start gap-3">
            <div className="mt-0.5 rounded-full border border-white/40 bg-white/35 p-2">{icon}</div>
            <div>
              <p className="text-sm font-bold">{alert.type === "error" ? "Aksi gagal" : "Berhasil"}</p>
              <p className="mt-1 text-sm leading-6">{alert.message}</p>
            </div>
          </div>
          <button
            aria-label="Tutup notifikasi"
            className="relative rounded-full border border-white/40 bg-white/35 px-3 py-1 text-xs font-semibold text-current transition hover:bg-white/55"
            onClick={onClose}
            type="button"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlertToast;
