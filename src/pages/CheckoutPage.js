function CheckoutPage({
  checkoutForm,
  setCheckoutForm,
  handleCheckoutSubmit,
  navigateTo,
  cartItems,
  memberCartCount,
  cartTotalPrice,
  formatCurrency,
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-500">Checkout Page</p>
        <h1 className="mt-3 text-4xl font-black text-slate-900">Lengkapi data checkout member.</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Username mengikuti akun login member. Setelah checkout berhasil, transaksi akan selesai
          dan kamu diarahkan ke halaman about.
        </p>

        <form className="mt-8 grid gap-5 md:grid-cols-2" onSubmit={handleCheckoutSubmit}>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="checkout-username">
              Username
            </label>
            <input
              id="checkout-username"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500 outline-none"
              readOnly
              type="text"
              value={checkoutForm.username}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="checkout-fullname">
              Nama Lengkap
            </label>
            <input
              id="checkout-fullname"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500"
              onChange={(event) =>
                setCheckoutForm((current) => ({ ...current, fullName: event.target.value }))
              }
              type="text"
              value={checkoutForm.fullName}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="checkout-phone">
              Nomor Telepon
            </label>
            <input
              id="checkout-phone"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500"
              onChange={(event) =>
                setCheckoutForm((current) => ({ ...current, phoneNumber: event.target.value }))
              }
              type="tel"
              value={checkoutForm.phoneNumber}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="checkout-email">
              Alamat Email
            </label>
            <input
              id="checkout-email"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500"
              onChange={(event) =>
                setCheckoutForm((current) => ({ ...current, email: event.target.value }))
              }
              type="email"
              value={checkoutForm.email}
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="checkout-address">
              Alamat Rumah
            </label>
            <textarea
              id="checkout-address"
              className="min-h-28 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500"
              onChange={(event) =>
                setCheckoutForm((current) => ({ ...current, homeAddress: event.target.value }))
              }
              value={checkoutForm.homeAddress}
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="checkout-bank">
              Nomor Rekening
            </label>
            <input
              id="checkout-bank"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500"
              onChange={(event) =>
                setCheckoutForm((current) => ({ ...current, bankAccountNumber: event.target.value }))
              }
              type="text"
              value={checkoutForm.bankAccountNumber}
            />
          </div>

          <div className="flex gap-3 md:col-span-2 md:justify-end">
            <button
              className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700"
              onClick={() => navigateTo("products")}
              type="button"
            >
              Kembali Belanja
            </button>
            <button
              className="rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
              type="submit"
            >
              Konfirmasi Checkout
            </button>
          </div>
        </form>
      </section>

      <aside className="space-y-6">
        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-500">Checkout List</p>
          <h2 className="mt-3 text-2xl font-black text-slate-900">Barang yang akan dibayar</h2>

          <div className="mt-6 space-y-4">
            {cartItems.length ? (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4">
                  <img alt={item.title} className="h-16 w-16 rounded-2xl object-cover" src={item.image} />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold text-emerald-600">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
                Belum ada product di keranjang.
              </div>
            )}
          </div>
        </section>

        <section className="rounded-[2rem] bg-slate-900 p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">Ringkasan</p>
          <div className="mt-5 flex items-center justify-between text-sm text-slate-300">
            <span>Total item</span>
            <span>{memberCartCount}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-lg font-semibold">
            <span>Total harga</span>
            <span>{formatCurrency(cartTotalPrice)}</span>
          </div>
        </section>
      </aside>
    </div>
  );
}

export default CheckoutPage;
