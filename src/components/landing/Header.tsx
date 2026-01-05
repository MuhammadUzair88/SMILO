import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

function Header() {
  

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 px-6 py-2 border-b border-border/50 bg-background/80 backdrop-blur-md h-16">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={"/logo.png"}
            alt="smilo Logo"
            width={32}
            height={32}
            className="w-11"
          />
          <span className="font-semibold text-lg">SMILO</span>
        </Link>

        {/* Navigation links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-muted-foreground hover:text-foreground">
            How it Works
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            Pricing
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            About
          </a>
        </div>

        {/* Auth buttons / User avatar */}
        <div className="flex items-center gap-3">
          {/* When user is NOT signed in */}
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant={"ghost"} size={"sm"}>
                Login
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size={"sm"}>Sign Up</Button>
            </SignUpButton>
          </SignedOut>

          {/* When user IS signed in */}
          <SignedIn>
            {/* This button shows the user's avatar and dropdown for logout/delete */}
            <UserButton
              afterSignOutUrl="/" // redirect after logout
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-9 h-9", // size of avatar
                  userButtonAvatarImage: "rounded-full", // make it round
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}

export default Header;
