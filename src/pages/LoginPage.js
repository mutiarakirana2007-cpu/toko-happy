function LoginPage({ form, setForm, error, handleLogin }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-8 text-white lg:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.22),_transparent_35%)]" />

        <div className="relative z-10">
          <p className="text-lg font-medium text-emerald-300">Selamat datang kembali 👋</p>

          <h1 className="mt-4 text-4xl font-black leading-tight">
            Masuk ke <span className="text-emerald-400">Toko Happy</span>
          </h1>

          <p className="mt-5 max-w-lg leading-8 text-slate-300">Login untuk mulai belanja produk favoritmu dengan pengalaman yang lebih cepat, nyaman, dan praktis di Toko Happy.</p>

          <div className="mt-10 space-y-4">
            <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 text-lg">🛒</div>

              <div>
                <p className="font-semibold text-white">Belanja lebih praktis</p>

                <p className="mt-1 text-sm leading-6 text-slate-300">Tambahkan produk favorit ke keranjang dan checkout dengan mudah kapan saja.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 text-lg">🎁</div>

              <div>
                <p className="font-semibold text-white">Banyak pilihan produk</p>

                <p className="mt-1 text-sm leading-6 text-slate-300">Temukan berbagai produk menarik dengan harga yang bersahabat.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:p-10">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-slate-900">Login Account</h2>

          <p className="mt-2 text-slate-500">Masukkan username dan password untuk melanjutkan.</p>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="username">
              Username
            </label>

            <input
              id="username"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  username: event.target.value,
                }))
              }
              placeholder="Masukkan username"
              type="text"
              value={form.username}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="password">
              Password
            </label>

            <input
              id="password"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  password: event.target.value,
                }))
              }
              placeholder="Masukkan password"
              type="password"
              value={form.password}
            />
          </div>

          {error ? <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">{error}</div> : null}

          <button className="w-full rounded-full bg-emerald-500 px-6 py-4 font-semibold text-white transition hover:bg-emerald-600" type="submit">
            Login Sekarang
          </button>
        </form>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-500">Login untuk menikmati promo member dan harga terbaik.</div>
      </section>
    </div>
  );
}

export default LoginPage;
