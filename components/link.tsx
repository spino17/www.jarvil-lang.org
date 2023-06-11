import Link from "next/link";

export default function StyledLink(props: {
  children: JSX.Element;
  href: string;
}) {
  return (
    <Link href={props.href} style={{ textDecoration: "none" }}>
      {props.children}
    </Link>
  );
}
