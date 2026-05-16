import { ShoppingBag, Users, DollarSign, PackageCheck } from "lucide-react";

function AdminDashboardPage({ adminStats, recentOrders }) {
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "success":
      case "paid":
        return "bg-emerald-50 text-emerald-700";

      case "pending":
      case "waiting":
        return "bg-amber-50 text-amber-700";

      case "cancelled":
      case "failed":
        return "bg-rose-50 text-rose-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const generateRandomPhone = () => {
    return `08${Math.floor(100000000 + Math.random() * 900000000)}`;
  };

  const generateEmail = (customerName) => {
    return `${customerName?.toLowerCase().replace(/\s+/g, ".")}@gmail.com`;
  };

  const statIcons = [<ShoppingBag className="h-7 w-7" />, <DollarSign className="h-7 w-7" />, <Users className="h-7 w-7" />, <PackageCheck className="h-7 w-7" />];

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-semibold  tracking-[0.25em] text-emerald-500">Dashboard</p>

        <h1 className="mt-3 text-4xl font-black text-slate-900">Dashboard Toko Happy</h1>

        <p className="mt-3 max-w-2xl text-slate-600">Pantau performa toko, aktivitas pesanan, dan arah bisnis harian dalam satu panel admin.</p>
      </section>

      {/* STATS */}
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {adminStats.map((stat, index) => (
          <article key={stat.label} className="rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-start justify-between">
              {/* CONTENT */}
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>

                <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-900">{stat.value}</h2>

                <p className="mt-3 text-sm font-medium text-emerald-600">{stat.note}</p>
              </div>

              {/* ICON */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">{statIcons[index % statIcons.length]}</div>
            </div>
          </article>
        ))}
      </section>

      {/* RECENT ORDERS */}
      <section>
        <article className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold  tracking-[0.25em] text-emerald-500">Recent Orders</p>

              <h2 className="mt-3 text-3xl font-black text-slate-900">Pesanan terbaru</h2>

              <p className="mt-2 text-sm text-slate-500">Monitoring transaksi terbaru customer toko.</p>
            </div>

            <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">Total Orders: {recentOrders.length}</div>
          </div>

          {/* TABLE */}
          <div className="mt-8 overflow-x-auto rounded-3xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-black  tracking-wider text-slate-600">Order ID</th>

                  <th className="px-6 py-4 text-left text-xs font-black  tracking-wider text-slate-600">Customer</th>

                  <th className="px-6 py-4 text-left text-xs font-black  tracking-wider text-slate-600">Nomor Telepon</th>

                  <th className="px-6 py-4 text-left text-xs font-black  tracking-wider text-slate-600">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 bg-white">
                {!recentOrders.length ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-sm text-slate-500">
                      Belum ada pesanan terbaru.
                    </td>
                  </tr>
                ) : null}

                {recentOrders.map((order) => (
                  <tr key={order.id} className="transition hover:bg-emerald-50/40">
                    {/* ORDER ID */}
                    <td className="whitespace-nowrap px-6 py-5">
                      <p className="font-bold text-slate-900">#{order.id}</p>
                    </td>

                    {/* CUSTOMER */}
                    <td className="px-6 py-5">
                      <div>
                        <p className="font-semibold text-slate-900">{order.customer}</p>

                        <p className="mt-1 text-sm text-slate-500">{generateEmail(order.customer)}</p>
                      </div>
                    </td>

                    {/* PHONE */}
                    <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-600">{generateRandomPhone()}</td>

                    {/* STATUS */}
                    <td className="px-6 py-5">
                      <span className={`rounded-full px-4 py-2 text-xs font-bold ${getStatusBadge(order.status)}`}>{order.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </div>
  );
}

export default AdminDashboardPage;
