"use client";

import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { BravoLogo } from "@/components/main/Logo";
import { Separator } from "@/components/ui/separator";

export default function Navbar() {
	return (
		<div className="w-full">
			{/* Top Bar */}
			<div className="w-full bg-[#8B4513] text-white">
				<div className="container mx-auto flex flex-wrap items-center justify-center gap-72 px-4 py-2 text-sm">
					<div className="flex flex-wrap items-center gap-6">
						<div className="flex items-center gap-2">
							<Mail className="h-4 w-4" />
							<a href="mailto:info@bravointernation.com.np">
								info@bravointernational.com.np
							</a>
						</div>
						<Separator
							color="white"
							className="text-white h-4"
							orientation="vertical"
						/>
						<div className="flex items-center gap-2">
							<Phone className="h-4 w-4" />
							<a href="tel:+977-9851352807">+977 - 9851352807 / 015908733</a>
						</div>
						<Separator
							color="white"
							className="text-white h-4"
							orientation="vertical"
						/>
						<div className="flex items-center gap-2">
							<MapPin className="h-4 w-4" />
							<span> Putalisadak Chowk Kathmandu </span>
						</div>
					</div>
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-2">
							<Clock className="h-4 w-4" />
							<span>9AM-18PM</span>
						</div>
						<Separator
							color="white"
							className="text-white h-4"
							orientation="vertical"
						/>

						<a href="#" className="hover:text-gray-200">
							<span className="sr-only">Facebook</span>
							<svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
								<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
							</svg>
						</a>
						<a href="#" className="hover:text-gray-200">
							<span className="sr-only">YouTube</span>
							<svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
								<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
							</svg>
						</a>
						<a href="#" className="hover:text-gray-200">
							<span className="sr-only">LinkedIn</span>
							<svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
								<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
							</svg>
						</a>
						<a href="#" className="hover:text-gray-200">
							<span className="sr-only">Instagram</span>
							<svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
								<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
							</svg>
						</a>
					</div>
				</div>
			</div>

			{/* Main Navigation */}
			<div className="container mx-auto flex items-center justify-center gap-64 px-4 py-4">
				<Link href="/" className="flex items-center gap-2">
					<BravoLogo width={100} height={100} />
				</Link>

				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<Link href="/" legacyBehavior passHref>
								<NavigationMenuLink className="group font-semibold lg:text-lg  inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
									Home
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuTrigger className="font-semibold lg:text-lg">About</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid w-48 gap-3 p-4">
									<li>
										<NavigationMenuLink asChild>
											<Link
												href="/about/faqs"
												className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
											>
												FAQs
											</Link>
										</NavigationMenuLink>
									</li>
									<li>
										<NavigationMenuLink asChild>
											<Link
												href="/about/team"
												className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
											>
												Our Teams
											</Link>
										</NavigationMenuLink>
									</li>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuTrigger className="font-semibold lg:text-lg">Services</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid w-[500px] grid-cols-2 gap-3 p-4">
									<li className="row-span-3">
										<NavigationMenuLink asChild>
											<div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
												<div className="mb-2 mt-4 text-lg font-bold">
													Study Abroad
												</div>
												<ul className="grid gap-2">
													<li>
														<Link
															href="/services/study/usa"
															className="hover:underline"
														>
															Study in USA
														</Link>
													</li>
													<li>
														<Link
															href="/services/study/australia"
															className="hover:underline"
														>
															Study in Australia
														</Link>
													</li>
													<li>
														<Link
															href="/services/study/europe"
															className="hover:underline"
														>
															Study in Europe
														</Link>
													</li>
													<li>
														<Link
															href="/services/study/canada"
															className="hover:underline"
														>
															Study in Canada
														</Link>
													</li>
													<li>
														<Link
															href="/services/study/japan"
															className="hover:underline"
														>
															Study in Japan
														</Link>
													</li>
													<li>
														<Link
															href="/services/study/india"
															className="hover:underline"
														>
															Study in India
														</Link>
													</li>
												</ul>
											</div>
										</NavigationMenuLink>
									</li>
									<li className="row-span-3">
										<NavigationMenuLink asChild>
											<div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
												<div className="mb-2 mt-4 text-lg font-bold">
													Test Registration
												</div>
												<ul className="grid gap-2">
													<li>
														<Link
															href="/services/test/ielts"
															className="hover:underline"
														>
															IELTS
														</Link>
													</li>
													<li>
														<Link
															href="/services/test/pte"
															className="hover:underline"
														>
															PTE-P
														</Link>
													</li>
													<li>
														<Link
															href="/services/test/toefl"
															className="hover:underline"
														>
															TOEFL
														</Link>
													</li>
													<li>
														<Link
															href="/services/test/celpip"
															className="hover:underline"
														>
															CELPIP
														</Link>
													</li>
												</ul>
											</div>
										</NavigationMenuLink>
									</li>
									<li className="col-span-2">
										<NavigationMenuLink asChild>
											<div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
												<div className="mb-2 mt-4 text-lg font-bold">
													Test Preparation
												</div>
												<ul className="grid grid-cols-3 gap-2">
													<li>
														<Link
															href="/services/prep/ielts"
															className="hover:underline"
														>
															IELTS
														</Link>
													</li>
													<li>
														<Link
															href="/services/prep/pte"
															className="hover:underline"
														>
															PTE
														</Link>
													</li>
													<li>
														<Link
															href="/services/prep/toefl"
															className="hover:underline"
														>
															TOEFL
														</Link>
													</li>
													<li>
														<Link
															href="/services/prep/sat"
															className="hover:underline"
														>
															SAT
														</Link>
													</li>
													<li>
														<Link
															href="/services/prep/gre"
															className="hover:underline"
														>
															GRE
														</Link>
													</li>
													<li>
														<Link
															href="/services/prep/bridge"
															className="hover:underline"
														>
															Bridge Course
														</Link>
													</li>
													<li>
														<Link
															href="/services/prep/mock"
															className="hover:underline"
														>
															Mock Test
														</Link>
													</li>
												</ul>
											</div>
										</NavigationMenuLink>
									</li>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<Link href="/projects" legacyBehavior passHref>
								<NavigationMenuLink className="group lg:text-lg inline-flex font-semibold lg:text-lg h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
									Projects
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<Link href="/blog" legacyBehavior passHref>
								<NavigationMenuLink className="group lg:text-lg font-semibold inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm  transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
									Blog
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<Link href="/contact" legacyBehavior passHref>
								<NavigationMenuLink className="group lg:text-lg font-semibold inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm  transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
									Contact
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>

				<div className="flex items-center gap-4">
					<Button variant="outline">Login</Button>
					<Button className="bg-orange-500 hover:bg-orange-600">
						Register
					</Button>
				</div>
			</div>
		</div>
	);
}
