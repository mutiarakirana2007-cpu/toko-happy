function AdminProductsPage({
  loadProducts,
  productOffset,
  openCreateProductModal,
  productsError,
  productsLoading,
  adminProducts,
  setProductOffset,
  pageSize,
  formatCurrency,
  handleEditProduct,
  handleDeleteProduct,
  isProductModalOpen,
  editingProductId,
  closeProductModal,
  handleProductSubmit,
  productForm,
  setProductForm,
  categories,
  placeholderImage,
  isSubmittingProduct,
  categoriesLoading,
}) {
  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-500">
              Product List
            </p>
            <h1 className="mt-3 text-4xl font-black text-slate-900">Kelola product via API</h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Halaman ini khusus admin untuk mendapatkan list products, menambah, mengubah, dan
              menghapus product dari API.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
              onClick={() => loadProducts(productOffset)}
              type="button"
            >
              Refresh List
            </button>
            <button
              className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
              onClick={openCreateProductModal}
              type="button"
            >
              Add Product Baru
            </button>
          </div>
        </div>
      </section>

      <section>
        <article className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900">List products</h2>
              <p className="mt-2 text-sm text-slate-500">
                Menampilkan {pageSize} item per halaman dari endpoint products.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={productOffset === 0 || productsLoading}
                onClick={() => setProductOffset((current) => Math.max(current - pageSize, 0))}
                type="button"
              >
                Prev
              </button>
              <button
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={productsLoading || adminProducts.length < pageSize}
                onClick={() => setProductOffset((current) => current + pageSize)}
                type="button"
              >
                Next
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {productsLoading ? <p className="text-sm text-slate-500">Memuat products dari API...</p> : null}
            {productsError ? (
              <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{productsError}</p>
            ) : null}
            {!productsLoading && !adminProducts.length ? (
              <p className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-500">
                Belum ada data product yang tampil.
              </p>
            ) : null}
            {adminProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-[1.75rem] border border-slate-200 p-5 transition hover:border-emerald-300"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div className="flex gap-4">
                    <img
                      alt={product.title}
                      className="h-20 w-20 rounded-2xl object-cover ring-1 ring-slate-200"
                      src={product.images?.[0] || placeholderImage}
                    />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">
                        #{product.id} • {product.category?.name || "No category"}
                      </p>
                      <h3 className="mt-2 text-xl font-black text-slate-900">{product.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{product.description}</p>
                    </div>
                  </div>
                  <div className="shrink-0 text-left md:text-right">
                    <p className="text-2xl font-black text-slate-900">{formatCurrency(product.price)}</p>
                    <div className="mt-4 flex gap-3 md:justify-end">
                      <button
                        className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
                        onClick={() => handleEditProduct(product)}
                        type="button"
                      >
                        Edit
                      </button>
                      <button
                        className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white"
                        onClick={() => handleDeleteProduct(product.id)}
                        type="button"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      {isProductModalOpen ? (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/45 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-4xl rounded-[2rem] bg-white p-6 shadow-2xl ring-1 ring-slate-200 md:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-500">
                  {editingProductId ? "Edit Product" : "Add Product"}
                </p>
                <h2 className="mt-2 text-3xl font-black text-slate-900">
                  {editingProductId ? "Perbarui product" : "Tambah product baru"}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {editingProductId
                    ? "Ubah detail product lalu simpan perubahan ke API."
                    : "Isi form berikut untuk menambahkan product baru ke API."}
                </p>
              </div>
              <button
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
                onClick={closeProductModal}
                type="button"
              >
                Tutup
              </button>
            </div>

            <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleProductSubmit}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="title">
                  Nama Product
                </label>
                <input
                  id="title"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500"
                  onChange={(event) => setProductForm((current) => ({ ...current, title: event.target.value }))}
                  placeholder="Contoh: Happy Granola"
                  type="text"
                  value={productForm.title}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="price">
                  Harga
                </label>
                <input
                  id="price"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500"
                  min="1"
                  onChange={(event) => setProductForm((current) => ({ ...current, price: event.target.value }))}
                  placeholder="120000"
                  type="number"
                  value={productForm.price}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="category">
                  Category
                </label>
                <select
                  id="category"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-500"
                  onChange={(event) =>
                    setProductForm((current) => ({ ...current, categoryId: event.target.value }))
                  }
                  value={productForm.categoryId}
                >
                  <option value="">Pilih category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="image">
                  URL Gambar
                </label>
                <input
                  id="image"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500"
                  onChange={(event) => setProductForm((current) => ({ ...current, imageUrl: event.target.value }))}
                  placeholder={placeholderImage}
                  type="url"
                  value={productForm.imageUrl}
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="description">
                  Deskripsi
                </label>
                <textarea
                  id="description"
                  className="min-h-24 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500"
                  onChange={(event) =>
                    setProductForm((current) => ({ ...current, description: event.target.value }))
                  }
                  placeholder="Deskripsi singkat product"
                  value={productForm.description}
                />
              </div>

              <div className="md:col-span-2">
                {productsError ? (
                  <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{productsError}</p>
                ) : null}
              </div>

              <div className="flex flex-col gap-3 md:col-span-2 sm:flex-row sm:justify-end">
                <button
                  className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
                  onClick={closeProductModal}
                  type="button"
                >
                  Batal
                </button>
                <button
                  className="rounded-full bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isSubmittingProduct || categoriesLoading}
                  type="submit"
                >
                  {isSubmittingProduct
                    ? "Menyimpan..."
                    : editingProductId
                      ? "Simpan Perubahan Product"
                      : "Tambah Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default AdminProductsPage;
