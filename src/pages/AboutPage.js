import { CheckCircle2 } from "lucide-react";

function AboutPage({ navigateTo }) {
  return (
    <div className="space-y-8 about-page">
      <section className="animate-rise-up relative overflow-hidden rounded-[2.25rem] bg-slate-900 px-8 py-10 text-white shadow-2xl md:px-12 md:py-14">
        <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl animate-soft-float" />

        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-lime-300/10 blur-3xl animate-soft-float-delayed" />

        <div className="absolute bottom-0 left-1/3 h-32 w-32 rounded-full bg-white/10 blur-2xl animate-soft-float" />

        <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="text-sm font-medium text-emerald-300">Tentang Toko Happy</p>

            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight md:text-6xl">Belanja kebutuhan terasa lebih nyaman, praktis, dan menyenangkan.</h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Toko Happy hadir untuk membantu member menemukan produk yang dibutuhkan dengan lebih cepat, barang-barang terbaru dengan kualitas top, dan pengalaman belanja yang lebih nyaman.
            </p>

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
              {
                icon: "🛍️",
                value: "150+",
                label: "produk pilihan",
              },
              {
                icon: "⭐",
                value: "4.9/5",
                label: "rating pelanggan",
              },
              {
                icon: "⚡",
                value: "24 jam",
                label: "respon admin",
              },
              {
                icon: "🚚",
                value: "Cepat",
                label: "pengiriman praktis",
              },
            ].map((item, index) => (
              <div key={item.label} className="animate-rise-up rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur" style={{ animationDelay: `${index * 90}ms` }}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>

                  <div>
                    <p className="text-3xl font-black">{item.value}</p>

                    <p className="mt-1 text-sm text-slate-300">{item.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOPPING EXPERIENCE */}
      <section className="animate-rise-up overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
        <div className="grid gap-0 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div className="p-8 md:p-10">
            <p className="text-sm font-medium text-emerald-500">Pengalaman belanja yang lebih nyaman</p>

            <h2 className="mt-3 max-w-2xl text-3xl font-black leading-tight text-slate-900 md:text-4xl">Belanja online jadi lebih praktis, cepat, dan menyenangkan.</h2>

            <p className="mt-5 max-w-2xl leading-8 text-slate-600">Kami menyediakan toko online yang sederhana agar member bisa lebih mudah mencari produk dan menyelesaikan pesanan tanpa ribet.</p>
          </div>

          <div className="relative h-full min-h-[420px] overflow-hidden bg-slate-100">
            <div className="absolute -left-16 top-10 h-40 w-40 rounded-full bg-emerald-200/40 blur-3xl" />

            <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-orange-200/40 blur-3xl" />

            <img src="/about.png" alt="Shopping Illustration" className="relative z-10 h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="animate-rise-up rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200" style={{ animationDelay: "80ms" }}>
          <p className="text-sm font-medium text-emerald-500">Cerita kami</p>

          <h2 className="mt-3 text-3xl font-black text-slate-900">Dibangun dari pengalaman belanja sehari-hari yang ingin terasa lebih simpel.</h2>

          <p className="mt-5 leading-8 text-slate-600">
            Kami percaya pengalaman belanja yang baik bukan cuma soal harga, tapi juga soal kenyamanan. Karena itu, Toko Happy hadir supaya member bisa menemukan produk dengan lebih baik dan nyaman berbelanja! 🎉
          </p>
        </article>

        <div className="grid gap-6">
          <article className="animate-rise-up overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-500 to-emerald-700 p-8 text-white shadow-xl" style={{ animationDelay: "140ms" }}>
            <p className="text-sm font-medium text-emerald-100">Kenapa memilih Toko Happy?</p>

            <h2 className="mt-3 text-3xl font-black leading-tight">Kami ingin pengalaman belanja online Anda lebih praktis.</h2>

            <div className="mt-6 grid gap-4">
              {["Produk dipilih dengan kualitas yang nyaman dipakai sehari-hari.", "Tampilan toko yang sederhana dan responsif.", "Pelayanan cepat agar belanja terasa lebih menyenangkan."].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-3xl bg-white/10 p-4 text-emerald-50 backdrop-blur">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15">
                    <CheckCircle2 size={18} className="text-white" />
                  </div>

                  <p className="leading-7">{item}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="animate-rise-up rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-slate-200 md:px-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: "🛍️",
              title: "Produk Pilihan",
              text: "Produk dikurasi supaya nyaman dipakai sehari-hari.",
            },
            {
              icon: "🚚",
              title: "Pengiriman Cepat",
              text: "Pesanan diproses lebih praktis dan mudah dipantau.",
            },
            {
              icon: "💳",
              title: "Pembayaran Aman",
              text: "Checkout terasa lebih nyaman dan sederhana.",
            },
            {
              icon: "⭐",
              title: "Member Puas",
              text: "Banyak member kembali belanja karena pengalaman yang nyaman.",
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className="animate-rise-up flex flex-col items-center rounded-[1.75rem] border border-slate-200 bg-slate-50 px-5 py-6 text-center transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-emerald-200 bg-emerald-50 text-3xl">{item.icon}</div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">{item.title}</h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="animate-rise-up rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 md:p-10" style={{ animationDelay: "320ms" }}>
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-medium text-emerald-500">Mulai belanja sekarang</p>

            <h2 className="mt-3 text-3xl font-black text-slate-900">Temukan produk favoritmu di Toko Happy.</h2>

            <p className="mt-4 max-w-3xl leading-8 text-slate-600">Belanja sekarang juga dan dapatkan promo menarik pada produk pilihan Anda.</p>
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
