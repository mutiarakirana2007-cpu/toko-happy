function AboutPage({ navigateTo }) {
  return (
    <div className="space-y-8 about-page">
      <section className="animate-rise-up relative overflow-hidden rounded-[2.25rem] bg-slate-900 px-8 py-10 text-white shadow-2xl md:px-12 md:py-14">
        <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl animate-soft-float" />
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-lime-300/10 blur-3xl animate-soft-float-delayed" />
        <div className="absolute bottom-0 left-1/3 h-32 w-32 rounded-full bg-white/10 blur-2xl animate-soft-float" />
        <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">About Us</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight md:text-6xl">Toko Happy hadir untuk membuat kebutuhan harian terasa lebih hangat, cepat, dan penuh niat baik.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Kami bukan sekadar toko. Kami membangun pengalaman belanja yang terasa dekat, rapi, dan menyenangkan untuk ritme hidup keluarga modern.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-400" onClick={() => navigateTo("products")} type="button">
                Jelajahi Produk
              </button>
              <button className="rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/15" onClick={() => navigateTo("login")} type="button">
                Gabung Sebagai Member
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              { value: "150+", label: "produk pilihan" },
              { value: "4.9/5", label: "ulasan pelanggan" },
              { value: "24 jam", label: "respon admin" },
              { value: "2026", label: "tahun tumbuh lebih cepat" },
            ].map((item, index) => (
              <div key={item.label} className="animate-rise-up rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur" style={{ animationDelay: `${index * 90}ms` }}>
                <p className="text-3xl font-black">{item.value}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.25em] text-slate-300">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="animate-rise-up rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200" style={{ animationDelay: "80ms" }}>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">Our Story</p>
          <h2 className="mt-3 text-3xl font-black text-slate-900">Cerita kecil yang dibangun dengan detail besar.</h2>
          <p className="mt-5 leading-8 text-slate-600">
            Toko Happy tumbuh dari ide sederhana: kebutuhan sehari-hari seharusnya bisa didapat dengan lebih cepat tanpa kehilangan rasa nyaman. Kami menggabungkan kurasi produk, layanan yang ramah, dan sistem yang rapi agar pengalaman
            belanja terasa ringan dari awal sampai selesai.
          </p>
          <div className="mt-8 space-y-5">
            {[
              {
                year: "Awal",
                text: "Dimulai dari kebutuhan toko yang ingin terasa modern tapi tetap akrab seperti langganan dekat rumah.",
              },
              {
                year: "Bertumbuh",
                text: "Kurasi produk diperluas agar member bisa menemukan kebutuhan praktis tanpa harus berpindah-pindah toko.",
              },
              {
                year: "Sekarang",
                text: "Fokus kami adalah pengalaman yang cepat, visual yang menyenangkan, dan operasional yang tertata.",
              },
            ].map((item, index) => (
              <div key={item.year} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white shadow-lg">{index + 1}</div>
                  {index !== 2 ? <div className="mt-2 h-full w-px bg-emerald-200" /> : null}
                </div>
                <div className="pb-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-500">{item.year}</p>
                  <p className="mt-2 leading-7 text-slate-600">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <div className="grid gap-6">
          <article className="animate-rise-up overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-500 to-emerald-700 p-8 text-white shadow-xl" style={{ animationDelay: "140ms" }}>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-100">Nilai Kami</p>
            <h2 className="mt-3 text-3xl font-black">Kami percaya belanja yang baik itu terasa jelas, cepat, dan hangat.</h2>
            <div className="mt-6 grid gap-4">
              {["Kurasi produk dengan kualitas yang terasa, bukan sekadar ramai.", "Pelayanan yang responsif dan tidak bikin pelanggan menunggu tanpa arah.", "Sistem yang tertata agar admin dan member sama-sama nyaman."].map((item) => (
                <div key={item} className="rounded-3xl bg-white/10 p-4 text-emerald-50 backdrop-blur">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Visi",
                text: "Menjadi toko pilihan keluarga muda yang ingin serba praktis tanpa kehilangan kualitas.",
              },
              {
                title: "Misi",
                text: "Menyediakan produk terpercaya, layanan cepat, dan pengalaman digital yang mudah dipakai.",
              },
              {
                title: "Tim",
                text: "Digerakkan oleh tim kecil yang teliti pada stok, tampilan, dan rasa nyaman pelanggan.",
              },
              {
                title: "Komitmen",
                text: "Terus bertumbuh lewat detail kecil yang membuat pengalaman belanja terasa lebih baik.",
              },
            ].map((item, index) => (
              <article key={item.title} className="animate-rise-up rounded-[1.75rem] bg-white p-7 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg" style={{ animationDelay: `${220 + index * 70}ms` }}>
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="animate-rise-up rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 md:p-10" style={{ animationDelay: "320ms" }}>
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">Why Happy</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900">Kami ingin setiap kunjungan terasa seperti menemukan toko favorit baru.</h2>
            <p className="mt-4 max-w-3xl leading-8 text-slate-600">Dari halaman produk sampai checkout, Toko Happy dirancang supaya member bisa bergerak cepat, paham apa yang dibeli, dan merasa dilayani dengan niat yang baik.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600" onClick={() => navigateTo("products")} type="button">
              Belanja Sekarang
            </button>
            <button className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600" onClick={() => navigateTo("home")} type="button">
              Kembali ke Home
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
