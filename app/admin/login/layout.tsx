export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This minimal layout overrides the parent admin layout
  // to prevent the auth redirect on the login page
  return children
}
