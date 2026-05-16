function ProductsPage({ storefrontProducts, memberCartCount, storefrontError, storefrontLoading, loadStorefrontProducts, formatCurrency, handleMemberAddProduct, session, placeholderImage }) {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-emerald-600 via-emerald-500 to-lime-400 p-8 text-white shadow-lg">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-50/90">Product Page</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black md:text-5xl">Belanja produk Toko Happy dengan nuansa marketplace yang cepat dan praktis.</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-emerald-50/90">Semua product ditarik langsung dari API. Member bisa menambahkan product ke keranjang langsung dari grid belanja.</p>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Pilihan Product</h2>
            <p className="mt-2 text-sm text-slate-500">Explore product terbaru dengan layout grid ala e-commerce.</p>
          </div>
          <button className="rounded-full border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100" onClick={loadStorefrontProducts} type="button">
            Refresh Product
          </button>
        </div>

        {storefrontError ? <p className="mt-5 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{storefrontError}</p> : null}

        {storefrontLoading ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={`skeleton-${index + 1}`} className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
                <div className="h-44 animate-pulse bg-slate-100" />
                <div className="space-y-3 p-4">
                  <div className="h-3 w-24 animate-pulse rounded-full bg-slate-100" />
                  <div className="h-4 w-full animate-pulse rounded-full bg-slate-100" />
                  <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-100" />
                  <div className="h-10 animate-pulse rounded-2xl bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {!storefrontLoading ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {storefrontProducts.map((product) => {
              const rating = (4 + (product.id % 10) / 10).toFixed(1);
              const sold = 20 + product.id * 3;

              return (
                <article key={product.id} className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg">
                  <div className="relative">
                    <img alt={product.title} className="h-44 w-full object-cover" src={product.images?.[0] || placeholderImage} />
                    <span className="absolute left-3 top-3 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">Hemat 15%</span>
                    <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700">{product.category?.name || "General"}</span>
                  </div>

                  <div className="space-y-3 p-4">
                    <h3 className="line-clamp-2 min-h-[3.5rem] text-sm font-semibold leading-6 text-slate-900">{product.title}</h3>
                    <p className="line-clamp-2 min-h-[2.8rem] text-xs leading-5 text-slate-500">{product.description}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-emerald-500">★ {rating}</span>
                      <span>•</span>
                      <span>{sold}+ terjual</span>
                    </div>
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="text-xl font-black text-emerald-600">{formatCurrency(product.price)}</p>
                        <p className="text-xs text-slate-400">Gratis ongkir area tertentu</p>
                      </div>
                    </div>
                    <button className="w-full rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600" onClick={() => handleMemberAddProduct(product)} type="button">
                      {session?.role === "member" ? "Tambah ke Keranjang" : "Login untuk Belanja"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default ProductsPage;
