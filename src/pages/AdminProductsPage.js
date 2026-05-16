import React, { useMemo, useState } from "react";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  const filteredProducts = useMemo(() => {
    let filtered = [...adminProducts];

    // SEARCH
    if (searchTerm.trim()) {
      filtered = filtered.filter((product) => [product.title, product.description, product.category?.name].join(" ").toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // SORT
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;

      case "name-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case "name-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;

      default:
        filtered.sort((a, b) => b.id - a.id);
        break;
    }

    return filtered;
  }, [adminProducts, searchTerm, sortBy]);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold  text-emerald-500">Product List</p>

            <h1 className="mt-3 text-4xl font-black text-slate-900">Kelola product</h1>

            <p className="mt-3 max-w-2xl text-slate-600">Halaman ini khusus admin untuk mendapatkan list products, menambah, mengubah, dan menghapus product.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900" onClick={() => loadProducts(productOffset)} type="button">
              Refresh List
            </button>

            <button className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600" onClick={openCreateProductModal} type="button">
              Add Product Baru
            </button>
          </div>
        </div>
      </section>

      {/* TABLE */}
      <section>
        <article className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900">List products</h2>

              <p className="mt-2 text-sm text-slate-500">Menampilkan {pageSize} item per halaman dari endpoint products.</p>
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

          {/* SEARCH + SORT */}
          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <input
                type="text"
                placeholder="Cari product, category, deskripsi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 pr-12 outline-none transition focus:border-emerald-500"
              />

              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</div>
            </div>

            <div className="flex gap-3">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none transition focus:border-emerald-500">
                <option value="latest">Terbaru</option>
                <option value="price-low">Harga Termurah</option>
                <option value="price-high">Harga Termahal</option>
                <option value="name-asc">Nama A-Z</option>
                <option value="name-desc">Nama Z-A</option>
              </select>
            </div>
          </div>

          {/* TABLE */}
          <div className="mt-6 overflow-x-auto rounded-3xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-4 text-left text-xs font-black  tracking-wider text-slate-600">ID</th>

                  <th className="px-4 py-4 text-left text-xs font-black  tracking-wider text-slate-600">Image</th>

                  <th className="px-4 py-4 text-left text-xs font-black  tracking-wider text-slate-600">Product</th>

                  <th className="px-4 py-4 text-left text-xs font-black  tracking-wider text-slate-600">Category</th>

                  <th className="px-4 py-4 text-left text-xs font-black  tracking-wider text-slate-600">Price</th>

                  <th className="px-4 py-4 text-left text-xs font-black  tracking-wider text-slate-600">Description</th>

                  <th className="px-4 py-4 text-center text-xs font-black  tracking-wider text-slate-600">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 bg-white">
                {productsLoading ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-sm text-slate-500">
                      Memuat products dari API...
                    </td>
                  </tr>
                ) : null}

                {productsError ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-4">
                      <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{productsError}</div>
                    </td>
                  </tr>
                ) : null}

                {!productsLoading && !filteredProducts.length ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-sm text-slate-500">
                      Belum ada data product yang tampil.
                    </td>
                  </tr>
                ) : null}

                {filteredProducts.map((product) => (
                  <tr key={product.id} className="transition hover:bg-emerald-50/40">
                    {/* ID */}
                    <td className="whitespace-nowrap px-4 py-4 text-sm font-bold text-slate-900">#{product.id}</td>

                    {/* IMAGE */}
                    <td className="px-4 py-4">
                      <img src={product.images?.[0] || placeholderImage} alt={product.title} className="h-16 w-16 rounded-2xl object-cover ring-1 ring-slate-200" />
                    </td>

                    {/* PRODUCT */}
                    <td className="min-w-[250px] px-4 py-4">
                      <p className="font-bold text-slate-900">{product.title}</p>
                    </td>

                    {/* CATEGORY */}
                    <td className="whitespace-nowrap px-4 py-4">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">{product.category?.name || "-"}</span>
                    </td>

                    {/* PRICE */}
                    <td className="whitespace-nowrap px-4 py-4">
                      <p className="font-black text-emerald-600">{formatCurrency(product.price)}</p>
                    </td>

                    {/* DESCRIPTION */}
                    <td className="max-w-[350px] px-4 py-4">
                      <p className="line-clamp-4 text-sm leading-6 text-slate-600">{product.description}</p>
                    </td>

                    {/* ACTION */}
                    <td className="px-4 py-4">
                      <div className="flex justify-center gap-2">
                        <button className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900" onClick={() => handleEditProduct(product)} type="button">
                          Edit
                        </button>

                        <button className="rounded-full bg-rose-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-rose-600" onClick={() => handleDeleteProduct(product.id)} type="button">
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>

      {/* MODAL */}
      {isProductModalOpen ? (
        <div className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-950/50 backdrop-blur-sm">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-5xl rounded-[2rem] bg-white p-6 shadow-2xl ring-1 ring-slate-200 md:p-8">
              {/* HEADER */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold  tracking-[0.25em] text-emerald-500">{editingProductId ? "Edit Product" : "Add Product"}</p>

                  <h2 className="mt-2 text-3xl font-black text-slate-900">{editingProductId ? "Perbarui product" : "Tambah product baru"}</h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">{editingProductId ? "Ubah detail product lalu simpan perubahan ke API." : "Isi form berikut untuk menambahkan product baru ke API."}</p>
                </div>

                <button className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900" onClick={closeProductModal} type="button">
                  Tutup
                </button>
              </div>

              {/* FORM */}
              <form className="mt-8 grid gap-5 md:grid-cols-2" onSubmit={handleProductSubmit}>
                {/* TITLE */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="title">
                    Nama Product
                  </label>

                  <input
                    id="title"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500"
                    onChange={(event) =>
                      setProductForm((current) => ({
                        ...current,
                        title: event.target.value,
                      }))
                    }
                    placeholder="Contoh: Happy Granola"
                    type="text"
                    value={productForm.title}
                  />
                </div>

                {/* PRICE */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="price">
                    Harga
                  </label>

                  <input
                    id="price"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500"
                    min="1"
                    onChange={(event) =>
                      setProductForm((current) => ({
                        ...current,
                        price: event.target.value,
                      }))
                    }
                    placeholder="120000"
                    type="number"
                    value={productForm.price}
                  />
                </div>

                {/* CATEGORY */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="category">
                    Category
                  </label>

                  <select
                    id="category"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-500"
                    onChange={(event) =>
                      setProductForm((current) => ({
                        ...current,
                        categoryId: event.target.value,
                      }))
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

                {/* IMAGE */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="image">
                    URL Gambar
                  </label>

                  <input
                    id="image"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500"
                    onChange={(event) =>
                      setProductForm((current) => ({
                        ...current,
                        imageUrl: event.target.value,
                      }))
                    }
                    placeholder={placeholderImage}
                    type="url"
                    value={productForm.imageUrl}
                  />
                </div>

                {/* DESCRIPTION */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="description">
                    Deskripsi
                  </label>

                  <textarea
                    id="description"
                    className="min-h-[180px] w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500"
                    onChange={(event) =>
                      setProductForm((current) => ({
                        ...current,
                        description: event.target.value,
                      }))
                    }
                    placeholder="Deskripsi singkat product"
                    value={productForm.description}
                  />
                </div>

                {/* ERROR */}
                {productsError ? (
                  <div className="md:col-span-2">
                    <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{productsError}</p>
                  </div>
                ) : null}

                {/* ACTION */}
                <div className="flex flex-col gap-3 md:col-span-2 sm:flex-row sm:justify-end">
                  <button className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900" onClick={closeProductModal} type="button">
                    Batal
                  </button>

                  <button
                    className="rounded-full bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isSubmittingProduct || categoriesLoading}
                    type="submit"
                  >
                    {isSubmittingProduct ? "Menyimpan..." : editingProductId ? "Simpan Perubahan Product" : "Tambah Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default AdminProductsPage;
