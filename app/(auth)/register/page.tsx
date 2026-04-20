import { redirect } from "next/navigation";

/**
 * Task #16: Register page
 * Since PhotoFuse uses OAuth-only authentication (Google, Apple, Amazon),
 * there's no traditional registration form. Redirect to sign-in.
 */
export default function RegisterPage() {
  redirect("/sign-in");
}
