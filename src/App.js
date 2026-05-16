import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from "react";
import AlertToast from "./components/AlertToast";
import AppFooter from "./components/AppFooter";
import useCart from "./hooks/useCart";

const API_BASE_URL = "https://api.escuelajs.co/api/v1";
const PAGE_SIZE = 8;
const PLACEHOLDER_IMAGE = "https://placehold.co/600x400";

const guestNavItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "products", label: "Products" },
  { id: "login", label: "Login" },
];

const memberNavItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "products", label: "Products" },
];

const adminNavItems = [
  { id: "admin", label: "Dashboard" },
  { id: "admin-products", label: "Product List" },
];

const adminStats = [
  { label: "Total Pesanan", value: "1.248", note: "+18% minggu ini" },
  { label: "Produk Aktif", value: "36", note: "5 produk baru" },
  { label: "Pelanggan Baru", value: "284", note: "+12% bulan ini" },
  { label: "Omzet Hari Ini", value: "Rp8,4 jt", note: "Target 92% tercapai" },
];

const recentOrders = [
  { id: "#HP-1024", customer: "Nadia Putri", item: "Happy Box", status: "Diproses" },
  { id: "#HP-1025", customer: "Raka Aditya", item: "Happy Brew", status: "Dikirim" },
  { id: "#HP-1026", customer: "Salsa Aulia", item: "Happy Crunch", status: "Selesai" },
  { id: "#HP-1027", customer: "Bimo Langit", item: "Happy Fresh", status: "Menunggu" },
];

const defaultProductForm = {
  title: "",
  price: "",
  description: "",
  categoryId: "",
  imageUrl: PLACEHOLDER_IMAGE,
};

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage"));
const AdminProductsPage = lazy(() => import("./pages/AdminProductsPage"));

function getPageFromHash() {
  const currentHash = window.location.hash.replace("#", "");
  const supportedPages = ["home", "about", "products", "login", "checkout", "admin", "admin-products"];

  if (supportedPages.includes(currentHash)) {
    return currentHash;
  }

  return "home";
}

function formatCurrency(value) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "Rp0";
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function App() {
  const [page, setPage] = useState(getPageFromHash);
  const [session, setSession] = useState(() => {
    const savedSession = localStorage.getItem("tokoHappySession");
    return savedSession ? JSON.parse(savedSession) : null;
  });
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [adminProducts, setAdminProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [productsError, setProductsError] = useState("");
  const [storefrontProducts, setStorefrontProducts] = useState([]);
  const [storefrontLoading, setStorefrontLoading] = useState(false);
  const [storefrontError, setStorefrontError] = useState("");
  const [productForm, setProductForm] = useState(defaultProductForm);
  const [editingProductId, setEditingProductId] = useState(null);
  const [isSubmittingProduct, setIsSubmittingProduct] = useState(false);
  const [productOffset, setProductOffset] = useState(0);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [alert, setAlert] = useState(null);
  const [checkoutForm, setCheckoutForm] = useState({
    username: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    homeAddress: "",
    bankAccountNumber: "",
  });

  const isAdminRoute = page === "admin" || page === "admin-products";
  const isCheckoutRoute = page === "checkout";

  useEffect(() => {
    const handleHashChange = () => {
      setPage(getPageFromHash());
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (session) {
      localStorage.setItem("tokoHappySession", JSON.stringify(session));
      return;
    }

    localStorage.removeItem("tokoHappySession");
  }, [session]);

  useEffect(() => {
    if (isAdminRoute && session?.role !== "admin") {
      window.location.hash = "login";
    }
  }, [isAdminRoute, session]);

  useEffect(() => {
    if (isCheckoutRoute && session?.role !== "member") {
      window.location.hash = "login";
    }
  }, [isCheckoutRoute, session]);

  useEffect(() => {
    setCheckoutForm((current) => ({
      ...current,
      username: session?.role === "member" ? session.username : "",
    }));
  }, [session]);

  useEffect(() => {
    if (!categories.length || productForm.categoryId) {
      return;
    }

    setProductForm((current) => ({
      ...current,
      categoryId: String(categories[0].id),
    }));
  }, [categories, productForm.categoryId]);

  const activeNavItems = useMemo(() => {
    if (session?.role === "admin") {
      return adminNavItems;
    }

    if (session?.role === "member") {
      return memberNavItems;
    }

    return guestNavItems;
  }, [session]);

  const showAlert = useCallback((message, type = "success") => {
    setAlert({
      id: Date.now(),
      message,
      type,
    });
  }, []);

  const welcomeMessage = useMemo(() => {
    if (!session) {
      return "Belanja praktis, rasa tetap fantastis.";
    }

    return session.role === "admin" ? `Admin ${session.name}, semua panel toko siap dipantau.` : `Halo ${session.name}, cek promo dan produk favoritmu hari ini.`;
  }, [session]);

  const loadCategories = useCallback(async () => {
    if (categories.length) {
      return;
    }

    setCategoriesLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/categories`);

      if (!response.ok) {
        throw new Error("Gagal mengambil data kategori.");
      }

      const data = await response.json();
      setCategories(data);
    } catch (loadError) {
      setProductsError(loadError.message);
      showAlert(loadError.message, "error");
    } finally {
      setCategoriesLoading(false);
    }
  }, [categories.length, showAlert]);

  const loadProducts = useCallback(
    async (offset) => {
      setProductsLoading(true);
      setProductsError("");

      try {
        const response = await fetch(`${API_BASE_URL}/products?offset=${offset}&limit=${PAGE_SIZE}`);

        if (!response.ok) {
          throw new Error("Gagal mengambil list product dari API.");
        }

        const data = await response.json();
        setAdminProducts(data);
      } catch (loadError) {
        setProductsError(loadError.message);
        showAlert(loadError.message, "error");
      } finally {
        setProductsLoading(false);
      }
    },
    [showAlert],
  );

  const loadStorefrontProducts = useCallback(async () => {
    setStorefrontLoading(true);
    setStorefrontError("");

    try {
      const response = await fetch(`${API_BASE_URL}/products?offset=0&limit=16`);

      if (!response.ok) {
        throw new Error("Gagal mengambil products untuk halaman member.");
      }

      const data = await response.json();
      setStorefrontProducts(data);
    } catch (loadError) {
      setStorefrontError(loadError.message);
      showAlert(loadError.message, "error");
    } finally {
      setStorefrontLoading(false);
    }
  }, [showAlert]);

  useEffect(() => {
    if (session?.role !== "admin" || page !== "admin-products") {
      return;
    }

    loadCategories();
    loadProducts(productOffset);
  }, [session, page, productOffset, loadCategories, loadProducts]);

  useEffect(() => {
    if (page !== "products" || storefrontProducts.length) {
      return;
    }

    loadStorefrontProducts();
  }, [page, storefrontProducts.length, loadStorefrontProducts]);

  function navigateTo(targetPage) {
    window.location.hash = targetPage;
  }

  const { cartItems, cartTotalPrice, clearCart, closeCart, handleMemberAddProduct, handleRemoveCartItem, isCartOpen, memberCartCount, toggleCart } = useCart({
    navigateTo,
    placeholderImage: PLACEHOLDER_IMAGE,
    session,
    showAlert,
  });

  function resetProductForm() {
    setEditingProductId(null);
    setProductForm({
      ...defaultProductForm,
      categoryId: categories[0] ? String(categories[0].id) : "",
    });
  }

  function openCreateProductModal() {
    resetProductForm();
    setProductsError("");
    setIsProductModalOpen(true);
  }

  function closeProductModal() {
    setIsProductModalOpen(false);
    setProductsError("");
    resetProductForm();
  }

  function handleLogin(event) {
    event.preventDefault();

    const username = form.username.trim();
    const password = form.password.trim();

    if (!username || !password) {
      setError("Username dan password wajib diisi.");
      return;
    }

    const isAdminLogin = username === "admin" && password === "admin";

    setSession({
      role: isAdminLogin ? "admin" : "member",
      name: isAdminLogin ? "Happy Admin" : username,
      username,
    });
    setError("");
    setForm({ username: "", password: "" });
    navigateTo(isAdminLogin ? "admin" : "home");
  }

  function handleLogout() {
    setSession(null);
    setForm({ username: "", password: "" });
    setError("");
    setAdminProducts([]);
    setCategories([]);
    setProductsError("");
    setProductOffset(0);
    resetProductForm();
    closeCart();
    navigateTo("home");
  }

  function handleEditProduct(product) {
    setEditingProductId(product.id);
    setProductForm({
      title: product.title || "",
      price: product.price ? String(product.price) : "",
      description: product.description || "",
      categoryId: product.category?.id ? String(product.category.id) : "",
      imageUrl: product.images?.[0] || PLACEHOLDER_IMAGE,
    });
    setProductsError("");
    setIsProductModalOpen(true);
  }

  function handleCheckoutNavigation() {
    if (!cartItems.length) {
      showAlert("Keranjang masih kosong.", "error");
      return;
    }

    closeCart();
    navigateTo("checkout");
  }

  function handleCheckoutSubmit(event) {
    event.preventDefault();

    const { username, fullName, phoneNumber, email, homeAddress, bankAccountNumber } = checkoutForm;

    if (!username || !fullName || !phoneNumber || !email || !homeAddress || !bankAccountNumber) {
      showAlert("Semua data checkout wajib diisi.", "error");
      return;
    }

    showAlert(`Transaction success by ${fullName} with total price ${formatCurrency(cartTotalPrice)}!`);

    clearCart();
    setCheckoutForm({
      username: session?.role === "member" ? session.username : "",
      fullName: "",
      phoneNumber: "",
      email: "",
      homeAddress: "",
      bankAccountNumber: "",
    });
    navigateTo("about");
  }

  async function handleDeleteProduct(productId) {
    const confirmed = window.confirm("Hapus product ini dari admin panel?");

    if (!confirmed) {
      return;
    }

    setIsSubmittingProduct(true);
    setProductsError("");

    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus product.");
      }

      setAdminProducts((current) => current.filter((product) => product.id !== productId));
      showAlert("Product berhasil dihapus.");

      if (editingProductId === productId) {
        resetProductForm();
      }
    } catch (deleteError) {
      setProductsError(deleteError.message);
      showAlert(deleteError.message, "error");
    } finally {
      setIsSubmittingProduct(false);
    }
  }

  async function handleProductSubmit(event) {
    event.preventDefault();

    if (!productForm.title || !productForm.price || !productForm.description || !productForm.categoryId) {
      setProductsError("Semua field product wajib diisi.");
      return;
    }

    const payload = {
      title: productForm.title,
      price: Number(productForm.price),
      description: productForm.description,
      categoryId: Number(productForm.categoryId),
      images: [productForm.imageUrl || PLACEHOLDER_IMAGE],
    };

    setIsSubmittingProduct(true);
    setProductsError("");

    try {
      const isEditing = Boolean(editingProductId);
      const response = await fetch(`${API_BASE_URL}/products${isEditing ? `/${editingProductId}` : "/"}`, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(isEditing ? "Gagal mengubah product." : "Gagal menambahkan product.");
      }

      const savedProduct = await response.json();

      if (isEditing) {
        setAdminProducts((current) => current.map((product) => (product.id === editingProductId ? savedProduct : product)));
        showAlert("Product berhasil diperbarui.");
      } else {
        setAdminProducts((current) => [savedProduct, ...current].slice(0, PAGE_SIZE));
        showAlert("Product baru berhasil ditambahkan.");
      }

      closeProductModal();
    } catch (submitError) {
      setProductsError(submitError.message);
      showAlert(submitError.message, "error");
    } finally {
      setIsSubmittingProduct(false);
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_28%),linear-gradient(180deg,_#fffdf7_0%,_#f8fafc_100%)] text-slate-900">
      <AlertToast alert={alert} onClose={() => setAlert(null)} />

      <header className="sticky top-0 z-20 border-b border-white/60 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <button className="text-left" onClick={() => navigateTo("home")} type="button">
            <p className="text-2xl font-black text-slate-900">Toko Happy</p>
            <p className="text-sm text-slate-500">Belanja simpel, mood ikut happy.</p>
          </button>

          <nav className="flex flex-wrap items-center gap-2">
            {activeNavItems.map((item) => (
              <button
                key={item.id}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  page === item.id ? (session?.role === "admin" ? "bg-emerald-500 text-white" : "bg-slate-900 text-white") : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
                onClick={() => navigateTo(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {session ? (
              <>
                {session.role === "member" ? (
                  <div className="relative">
                    <button
                      aria-label="Buka keranjang"
                      className="relative flex h-12 w-12 items-center justify-center rounded-full border border-emerald-200 bg-white text-emerald-700 shadow-sm transition hover:bg-emerald-50"
                      onClick={toggleCart}
                      type="button"
                    >
                      <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
                        <circle cx="9" cy="20" r="1.5" />
                        <circle cx="18" cy="20" r="1.5" />
                        <path d="M3 4h2l2.2 10.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 7H7" />
                      </svg>
                      {memberCartCount ? <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-emerald-500 px-1 text-xs font-bold text-white">{memberCartCount}</span> : null}
                    </button>

                    {isCartOpen ? (
                      <div className="absolute right-0 top-14 z-30 w-[340px] rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-2xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-500">Keranjang</p>
                            <h3 className="mt-1 text-xl font-black text-slate-900">{memberCartCount} item dipilih</h3>
                          </div>
                          <button className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-600" onClick={closeCart} type="button">
                            Tutup
                          </button>
                        </div>

                        <div className="mt-4 max-h-80 space-y-3 overflow-y-auto pr-1">
                          {cartItems.length ? (
                            cartItems.map((item) => (
                              <div key={item.id} className="flex items-center gap-3 rounded-2xl border border-slate-200 p-3">
                                <img alt={item.title} className="h-14 w-14 rounded-2xl object-cover" src={item.image} />
                                <div className="min-w-0 flex-1">
                                  <p className="line-clamp-2 text-sm font-semibold text-slate-900">{item.title}</p>
                                  <p className="mt-1 text-sm font-bold text-emerald-600">{formatCurrency(item.price)}</p>
                                  <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                                </div>
                                <button className="rounded-full bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600" onClick={() => handleRemoveCartItem(item.id)} type="button">
                                  Hapus
                                </button>
                              </div>
                            ))
                          ) : (
                            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">Keranjang masih kosong. Tambahkan product dari halaman products.</div>
                          )}
                        </div>

                        {memberCartCount > 0 ? (
                          <button className="mt-4 w-full rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600" onClick={handleCheckoutNavigation} type="button">
                            Checkout
                          </button>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                ) : null}

                <div className="hidden rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600 sm:block">
                  {session.name} - {session.role}
                </div>
                <button
                  className={`rounded-full border px-4 py-2 text-sm font-semibold ${session.role === "admin" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-300 text-slate-700"}`}
                  onClick={handleLogout}
                  type="button"
                >
                  Logout
                </button>
              </>
            ) : (
              <button className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600" onClick={() => navigateTo("login")} type="button">
                Login Sekarang
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
        <Suspense fallback={<div className="rounded-[2rem] bg-white p-8 text-center text-slate-500 shadow-sm ring-1 ring-slate-200">Memuat halaman...</div>}>
          {page === "home" && <HomePage navigateTo={navigateTo} welcomeMessage={welcomeMessage} />}
          {page === "about" && <AboutPage navigateTo={navigateTo} />}
          {page === "products" && (
            <ProductsPage
              formatCurrency={formatCurrency}
              handleMemberAddProduct={handleMemberAddProduct}
              loadStorefrontProducts={loadStorefrontProducts}
              memberCartCount={memberCartCount}
              placeholderImage={PLACEHOLDER_IMAGE}
              session={session}
              storefrontError={storefrontError}
              storefrontLoading={storefrontLoading}
              storefrontProducts={storefrontProducts}
            />
          )}
          {page === "login" && <LoginPage error={error} form={form} handleLogin={handleLogin} setForm={setForm} />}
          {page === "checkout" && session?.role === "member" && (
            <CheckoutPage
              cartItems={cartItems}
              cartTotalPrice={cartTotalPrice}
              checkoutForm={checkoutForm}
              formatCurrency={formatCurrency}
              handleCheckoutSubmit={handleCheckoutSubmit}
              memberCartCount={memberCartCount}
              navigateTo={navigateTo}
              setCheckoutForm={setCheckoutForm}
              onRemoveCartItem={handleRemoveCartItem}
            />
          )}
          {page === "admin" && session?.role === "admin" && <AdminDashboardPage adminStats={adminStats} recentOrders={recentOrders} />}
          {page === "admin-products" && session?.role === "admin" && (
            <AdminProductsPage
              adminProducts={adminProducts}
              categories={categories}
              categoriesLoading={categoriesLoading}
              closeProductModal={closeProductModal}
              editingProductId={editingProductId}
              formatCurrency={formatCurrency}
              handleDeleteProduct={handleDeleteProduct}
              handleEditProduct={handleEditProduct}
              handleProductSubmit={handleProductSubmit}
              isProductModalOpen={isProductModalOpen}
              isSubmittingProduct={isSubmittingProduct}
              loadProducts={loadProducts}
              openCreateProductModal={openCreateProductModal}
              pageSize={PAGE_SIZE}
              placeholderImage={PLACEHOLDER_IMAGE}
              productForm={productForm}
              productOffset={productOffset}
              productsError={productsError}
              productsLoading={productsLoading}
              setProductForm={setProductForm}
              setProductOffset={setProductOffset}
            />
          )}
        </Suspense>
      </main>

      <AppFooter navigateTo={navigateTo} />
    </div>
  );
}

export default App;
