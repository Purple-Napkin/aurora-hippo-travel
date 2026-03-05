import Link from "next/link";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Hippo Ecom";
const logoUrl = process.env.NEXT_PUBLIC_LOGO_URL ?? "https://vnawbscpsiwkqniibyya.supabase.co/storage/v1/object/public/placeholders/hippo-ecom.png";

export function Footer() {
  return (
    <footer className="border-t border-aurora-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            {logoUrl ? (
              <Link href="/" className="inline-block mb-3">
                <img
                  src={logoUrl}
                  alt=""
                  className="h-14 w-auto object-contain"
                />
              </Link>
            ) : null}
            <p className="text-lg font-semibold mb-2">{siteName}</p>
            <p className="text-aurora-muted text-sm">
              Your neighborhood online grocery store. Fresh produce, quality products, and convenient delivery.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Shop</h3>
            <ul className="space-y-2 text-sm text-aurora-muted">
              <li><Link href="/catalogue?category=bakery-items" className="hover:text-aurora-text transition-colors">Bakery Items</Link></li>
              <li><Link href="/catalogue?category=frozen-foods" className="hover:text-aurora-text transition-colors">Frozen Foods</Link></li>
              <li><Link href="/catalogue?category=vegetables" className="hover:text-aurora-text transition-colors">Vegetables</Link></li>
              <li><Link href="/catalogue?category=fruits" className="hover:text-aurora-text transition-colors">Fruits</Link></li>
              <li><Link href="/catalogue?category=dairy-products" className="hover:text-aurora-text transition-colors">Dairy Products</Link></li>
              <li><Link href="/catalogue?category=snacks" className="hover:text-aurora-text transition-colors">Snacks</Link></li>
              <li><Link href="/catalogue?category=beverages" className="hover:text-aurora-text transition-colors">Beverages</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Account</h3>
            <ul className="space-y-2 text-sm text-aurora-muted">
              <li><Link href="/account" className="hover:text-aurora-text transition-colors">My Account</Link></li>
              <li><Link href="/account/orders" className="hover:text-aurora-text transition-colors">Orders</Link></li>
              <li><Link href="/account/addresses" className="hover:text-aurora-text transition-colors">Addresses</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-aurora-muted">
              <li><Link href="/about" className="hover:text-aurora-text transition-colors">About Us</Link></li>
              <li><Link href="/about" className="hover:text-aurora-text transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
