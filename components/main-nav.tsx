"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useSupabase } from "@/lib/supabase/provider";

export function MainNav() {
  const router = useRouter();
  const { session } = useSupabase();

  const handleAuthClick = () => {
    if (session) {
      router.push('/dashboard');
    } else {
      router.push('/auth');
    }
  };

  return (
    <div className="border-b">
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">Songbird</span>
        </Link>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 w-[400px] grid-cols-1">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/services/communications"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Strategic Communications</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Develop effective communication strategies
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/services/advocacy"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Advocacy Consulting</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Expert guidance for impactful advocacy
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/generator" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Content Generator
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/resources" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Resources
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleAuthClick}
            className="flex items-center gap-2"
          >
            <LogIn className="h-4 w-4" />
            {session ? 'Dashboard' : 'Sign In'}
          </Button>
        </div>
      </div>
    </div>
  );
}