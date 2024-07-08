import Link from "next/link";
import AboutUs from "~/components/about-us";
import Footer from "~/components/footer";
import OurPastors from "~/components/our-pastors";
import { buttonVariants } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import Welcome from "~/components/welcome";
import WhatWeDo from "~/components/what-we-do";
import WhereAreWe from "~/components/where-are-we";
import { cn } from "~/lib/utils";

export default function Home() {
  return (
    <>
      <Dialog defaultOpen={true}>
        <DialogContent className="border-0">
          <DialogHeader>
            <DialogTitle>New update at PerkiWEB ✨</DialogTitle>
            <DialogDescription className="pt-4">
              Guess what? We now have a new list of cooking and cleaning group!
              🍳🧹
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Link
              href={"/group"}
              className={cn(
                buttonVariants({ variant: "default" }),
                "flex w-fit items-center justify-center",
              )}
            >
              Click here to see your teammates 🎉
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Welcome />
      <AboutUs />
      <WhatWeDo />
      <OurPastors />
      <WhereAreWe />
      <Footer />
    </>
  );
}
