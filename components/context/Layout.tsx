import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Layout({ children }) {
  const { authenticated } = useAuth();

  return (
    <div className="container">
      {authenticated && (
        <Link href="/">
          <a>Home</a>
        </Link>
      )}
      {children}
    </div>
  );
}
