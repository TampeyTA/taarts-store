import Link from 'next/link'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">TAArts</Link>
        <nav className="space-x-4">
          <Link href="/login">Login</Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  )
}
