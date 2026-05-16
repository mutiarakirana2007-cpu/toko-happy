import React from "react";

function CheckoutPage({
  checkoutForm,
  setCheckoutForm,
  handleCheckoutSubmit,
  navigateTo,
  cartItems,
  memberCartCount,
  cartTotalPrice,
  formatCurrency,
  onRemoveCartItem, // <-- Tambahkan prop ini untuk handle hapus item
}) {
  // JIKA KERANJANG KOSONG (0 ITEM)
  if (!cartItems || cartItems.length === 0 || memberCartCount === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[2rem] bg-white p-12 text-center shadow-sm ring-1 ring-slate-200">
        {/* Ikon Keranjang Silang */}
        <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-rose-50 text-rose-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-12 w-12">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          {/* Garis diagonal silang */}
          <div className="absolute h-14 w-1 rotate-45 rounded-full bg-rose-500"></div>
        </div>

        <h2 className="text-2xl font-black text-slate-900">Kamu belum memiliki item di keranjang</h2>
        <p className="mt-2 max-w-sm text-sm text-slate-500">Silakan kembali ke halaman produk dan pilih barang kesukaanmu sebelum melakukan checkout.</p>

        <button className="mt-6 rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600 shadow-lg shadow-emerald-500/20" onClick={() => navigateTo("products")} type="button">
          Mulai Belanja
        </button>
      </div>
    );
  }

  // JIKA KERANJANG ADA ISINYA (TAMPILAN UTAMA)
  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-500">Checkout Page</p>
        <h1 className="mt-3 text-4xl font-black text-slate-900">Lengkapi data checkout member.</h1>
        <p className="mt-3 max-w-2xl text-slate-600">Username mengikuti akun login member. Setelah checkout berhasil, transaksi akan selesai dan kamu diarahkan ke halaman about.</p>

        <form className="mt-8 grid gap-5 md:grid-cols-2" onSubmit={handleCheckoutSubmit}>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="checkout-username">
              Username
            </label>
            <input id="checkout-username" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500 outline-none" readOnly type="text" value={checkoutForm.username} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="checkout-fullname">
              Nama Lengkap
            </label>
            <input
              id="checkout-fullname"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500"
              onChange={(event) => setCheckoutForm((current) => ({ ...current, fullName: event.target.value }))}
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
              onChange={(event) => setCheckoutForm((current) => ({ ...current, phoneNumber: event.target.value }))}
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
              onChange={(event) => setCheckoutForm((current) => ({ ...current, email: event.target.value }))}
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
              onChange={(event) => setCheckoutForm((current) => ({ ...current, homeAddress: event.target.value }))}
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
              onChange={(event) => setCheckoutForm((current) => ({ ...current, bankAccountNumber: event.target.value }))}
              type="text"
              value={checkoutForm.bankAccountNumber}
            />
          </div>

          <div className="flex gap-3 md:col-span-2 md:justify-end">
            <button className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700" onClick={() => navigateTo("products")} type="button">
              Kembali Belanja
            </button>
            <button className="rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600" type="submit">
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
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4 group relative">
                <img alt={item.title} className="h-16 w-16 rounded-2xl object-cover" src={item.image} />
                <div className="min-w-0 flex-1 pr-6">
                  <p className="line-clamp-2 text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-500">Qty: {item.quantity}</p>
                </div>

                <div className="flex flex-col items-end justify-between gap-2 h-16">
                  {/* Button Hapus Item */}
                  <button type="button" onClick={() => onRemoveCartItem && onRemoveCartItem(item.id)} className="rounded-lg p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors" title="Hapus barang">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>

                  {/* Total Harga Item */}
                  <p className="text-sm font-bold text-emerald-600 whitespace-nowrap">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
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
