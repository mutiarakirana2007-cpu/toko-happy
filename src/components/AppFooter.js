function AppFooter({ navigateTo }) {
  return (
    <footer className="mt-16 border-t border-emerald-100 bg-white/85 backdrop-blur">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <p className="text-2xl font-black text-slate-900">Toko Happy</p>
          <p className="mt-3 max-w-md leading-7 text-slate-600">Belanja harian yang hangat, cepat, dan tetap terasa dekat cuma di Toko Happy!</p>
          <p className="mt-3 max-w-md leading-7 text-slate-600">Est. 2018 - Jakarta Indonesia</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-emerald-500">Explore</p>
          <div className="mt-4 flex flex-col gap-3">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "products", label: "Products" },
            ].map((item) => (
              <button key={item.id} className="text-left text-slate-600 transition hover:text-emerald-600" onClick={() => navigateTo(item.id)} type="button">
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-emerald-500">Highlights</p>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p>Produk pilihan yang praktis dan relevan.</p>
            <p>Pengalaman belanja member yang lebih rapi.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;
