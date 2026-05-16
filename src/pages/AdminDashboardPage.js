function AdminDashboardPage({ adminStats, recentOrders }) {
  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-500">Dashboard</p>
        <h1 className="mt-3 text-4xl font-black text-slate-900">Dashboard Toko Happy</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Pantau performa toko, aktivitas pesanan, dan arah bisnis harian dalam satu panel admin.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {adminStats.map((stat) => (
          <article key={stat.label} className="rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">{stat.label}</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900">{stat.value}</h2>
            <p className="mt-3 text-sm text-emerald-600">{stat.note}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-500">
            Recent Orders
          </p>
          <h2 className="mt-3 text-2xl font-black text-slate-900">Pesanan terbaru</h2>

          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr className="text-left text-sm text-slate-500">
                  <th className="px-4 py-3 font-semibold">ID</th>
                  <th className="px-4 py-3 font-semibold">Customer</th>
                  <th className="px-4 py-3 font-semibold">Produk</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="text-sm text-slate-600">
                    <td className="px-4 py-4 font-semibold text-slate-900">{order.id}</td>
                    <td className="px-4 py-4">{order.customer}</td>
                    <td className="px-4 py-4">{order.item}</td>
                    <td className="px-4 py-4">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-500">
            Admin Rules
          </p>
          <h2 className="mt-3 text-2xl font-black text-slate-900">Hak akses admin</h2>
          <div className="mt-6 space-y-4">
            {[
              "Mendapatkan list products dari endpoint products.",
              "Menambahkan product baru memakai body title, price, description, categoryId, dan images.",
              "Mengubah product existing dengan endpoint PUT /products/{id}.",
              "Menghapus product dengan endpoint DELETE /products/{id}.",
            ].map((item) => (
              <div key={item} className="rounded-3xl bg-slate-50 p-4 text-slate-600">
                {item}
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

export default AdminDashboardPage;
