export function StickyWrapper({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) {
  return (
    <>
      <section
        id={id}
        className="min-h-screen sticky top-0"
      >
        {children}
      </section>
    </>
  )
}
