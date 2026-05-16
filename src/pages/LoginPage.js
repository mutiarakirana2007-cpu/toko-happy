function LoginPage({ form, setForm, error, handleLogin }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-[2rem] bg-slate-900 p-8 text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">Login Page</p>
        <h1 className="mt-4 text-4xl font-black">Masuk ke Toko Happy.</h1>
        <p className="mt-4 leading-8 text-slate-300">
          Jika username dan password sama-sama `admin`, kamu masuk sebagai admin. Selain itu,
          akun akan otomatis punya role member.
        </p>

        <div className="mt-8 space-y-4">
          <div className="rounded-3xl bg-white/10 p-5">
            <p className="font-semibold">Aturan Login</p>
            <p className="mt-2 text-sm text-slate-300">Admin: username `admin` dan password `admin`.</p>
            <p className="text-sm text-slate-300">Selain itu: otomatis masuk sebagai member.</p>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500"
              onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))}
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
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500"
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              placeholder="Masukkan password"
              type="password"
              value={form.password}
            />
          </div>

          {error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{error}</p> : null}

          <button
            className="w-full rounded-full bg-emerald-500 px-6 py-4 font-semibold text-white transition hover:bg-emerald-600"
            type="submit"
          >
            Login Sekarang
          </button>
        </form>
      </section>
    </div>
  );
}

export default LoginPage;
