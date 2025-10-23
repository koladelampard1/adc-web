export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr]">
      <aside className="border-r bg-white p-4 sticky top-0 h-screen">
        <div className="font-bold text-xl mb-6">ADC Admin</div>
        <nav className="space-y-2 text-sm">
          <a className="block px-3 py-2 rounded hover:bg-gray-50" href="/admin">Dashboard</a>
          <a className="block px-3 py-2 rounded hover:bg-gray-50" href="/admin/courses">Courses</a>
          <a className="block px-3 py-2 rounded hover:bg-gray-50" href="/admin/generator">AI Generator</a>
          <a className="block px-3 py-2 rounded hover:bg-gray-50" href="/admin/media">Media</a>
          <a className="block px-3 py-2 rounded hover:bg-gray-50" href="/admin/users">Users</a>
          <a className="block px-3 py-2 rounded hover:bg-gray-50" href="/admin/settings">Settings</a>
        </nav>
      </aside>
      <main className="p-6">{children}</main>
    </div>
  )
}