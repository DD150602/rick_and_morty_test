import Link from "next/link"

interface CustomLinkProps {
  href: string
  linkName: string
}

export const CustomLink = (props: CustomLinkProps) => {
  const { href, linkName } = props
  return (
    <Link className="rounded-full px-4 py-2 transition-colors hover:bg-white/15" href={href}>
      {linkName}
    </Link>
  )
}
