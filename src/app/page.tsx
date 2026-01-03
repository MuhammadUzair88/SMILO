import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { SignUpButton } from "@clerk/nextjs";
import Image from "next/image";


export default function Home() {
  return (
<div>
  <h1>Home Page</h1>
  <SignedOut>
    <SignUpButton mode="modal">Hey SignUp</SignUpButton>
  </SignedOut>
  <SignedIn>
    <SignOutButton>Hey Bro Logout</SignOutButton>
  </SignedIn>
</div>

  );
}
