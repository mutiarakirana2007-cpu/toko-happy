function HomePage({ welcomeMessage, navigateTo }) {
  return (
    <div className="space-y-16">
      <section className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">✨ Toko Happy • Belanja simpel & nyaman</span>
          <div className="space-y-4">
            <h1 className="max-w-2xl text-4xl font-black leading-tight text-slate-900 md:text-6xl">Belanja kebutuhan favorit jadi lebih mudah di Toko Happy.</h1>

            <p className="max-w-xl text-lg leading-8 text-slate-600">
              {welcomeMessage} Temukan berbagai produk pilihan dengan tampilan yang nyaman, proses checkout yang praktis, dan pengalaman belanja yang terasa lebih santai untuk sehari-hari.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button className="rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600" onClick={() => navigateTo("products")} type="button">
              Lihat Produk
            </button>

            <button className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900" onClick={() => navigateTo("about")} type="button">
              Tentang Kami
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: "🛍️",
                value: "150+",
                label: "Produk tersedia",
              },
              {
                icon: "⚡",
                value: "Cepat",
                label: "Proses belanja praktis",
              },
              {
                icon: "💚",
                value: "4.9/5",
                label: "Kepuasan pelanggan",
              },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl bg-white/80 p-5 shadow-sm ring-1 ring-slate-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">{item.icon}</div>

                <p className="mt-4 text-2xl font-black text-slate-900">{item.value}</p>

                <p className="mt-2 text-sm leading-6 text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-8 text-white shadow-2xl">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-400/30 blur-2xl" />

          <div className="absolute -bottom-12 left-0 h-40 w-40 rounded-full bg-amber-300/20 blur-2xl" />

          <div className="relative space-y-6">
            <div className="flex items-center justify-between rounded-3xl bg-white/10 p-4 backdrop-blur">
              <div>
                <p className="text-sm text-slate-300">Promo spesial minggu ini</p>

                <p className="text-xl font-bold">Gratis ongkir area tertentu</p>
              </div>

              <span className="rounded-full bg-white/15 px-4 py-2 text-sm">🎉 Promo</span>
            </div>

            <div className="rounded-[1.75rem] bg-white p-6 text-slate-900">
              <p className="text-md font-semibold text-emerald-500">Produk favorit</p>

              <h2 className="mt-3 text-3xl font-black">Classic Black Baseball Cap</h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">Topi kasual dengan desain simpel dan nyaman dipakai untuk aktivitas sehari-hari.</p>

              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className="text-sm text-slate-500">Mulai dari</p>

                  <p className="text-3xl font-black text-slate-900">Rp79.000</p>
                </div>

                <button className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500" onClick={() => navigateTo("products")} type="button">
                  Lihat Detail
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-emerald-500 p-5">
                <p className="text-sm text-emerald-100">Untuk member baru</p>

                <p className="mt-2 text-2xl font-black">Diskon hingga 15%</p>
              </div>

              <div className="rounded-3xl bg-white/10 p-5">
                <p className="text-sm text-slate-300">Pengalaman belanja</p>

                <p className="mt-2 text-2xl font-black">Cepat & nyaman</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {[
          {
            icon: "🛒",
            title: "Produk Pilihan",
            text: "Berbagai produk dipilih agar cocok untuk kebutuhan sehari-hari dengan kualitas yang nyaman digunakan.",
          },
          {
            icon: "💸",
            title: "Harga Bersahabat",
            text: "Belanja jadi lebih tenang dengan harga yang ramah dan berbagai promo menarik setiap minggu.",
          },
          {
            icon: "🚚",
            title: "Proses Lebih Praktis",
            text: "Mulai dari memilih produk sampai checkout dengan mudah, antar barang gratis jabodetabek!",
          },
        ].map((item) => (
          <article key={item.title} className="rounded-[1.75rem] bg-white p-7 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-3xl">{item.icon}</div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">{item.title}</h3>

            <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export default HomePage;
