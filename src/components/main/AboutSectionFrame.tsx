"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AboutSectionFrame() {
	return (
		<section className="relative overflow-hidden bg-white py-20">
			{/* Background decoration */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute right-0 top-0 h-80 w-80 bg-orange-100/50 blur-3xl"></div>
				<div className="absolute bottom-0 left-0 h-80 w-80 bg-orange-50/50 blur-3xl"></div>
			</div>

			<div className="container shadow-gray-700/10 shadow-md  mx-auto px-4">
				<div className="grid gap-12 p-24 lg:grid-cols-2 lg:gap-20">
					{/* Image Section */}
					<motion.div
						className="relative"
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						{/* Decorative elements */}
						<div className="absolute -left-4 -top-4 h-full w-full rounded-full border-[16px] border-orange-200/60"></div>
						<div className="absolute -right-4 -bottom-4 h-full w-full rounded-full border-[16px] border-orange-900/20"></div>

						{/* Main image container */}
						<div className="relative aspect-square overflow-hidden rounded-full">
							<Image
								src="/others/office.jpg"
								alt="Bravo International Office"
								className="h-full w-full object-cover"
                                width={200}
                                height={200}
							/>
						</div>

						{/* Dotted pattern */}
						<div
							className="absolute -bottom-12 -right-12 h-24 w-24"
							style={{
								backgroundImage:
									"radial-gradient(circle, #C65D34 1px, transparent 1px)",
								backgroundSize: "8px 8px",
							}}
						></div>
					</motion.div>

					{/* Content Section */}
					<motion.div
						className="flex flex-col justify-center"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						<div className="inline-flex items-center gap-2">
							<div className="h-0.5 w-6 bg-orange-600"></div>
							<span className="text-sm font-semibold tracking-wider text-orange-600">
								ABOUT US
							</span>
						</div>

						<h2 className="mt-6 text-xl font-bold leading-tight tracking-tight text-gray-900 lg:text-3xl">
							We Are Increasing Business Success With Technology
						</h2>

						<div className="mt-8 space-y-6 text-md text-gray-600">
							<p>
								Over 10+ years working in IT services developing software
								applications and mobile apps for clients all over the world.
							</p>

							<p className="leading-[1.8rem]">
						Bravos International provides superior Designing, Development,
								Consulting and Marketing Solutions and Services in the IT
								industry, Serving both the Domestic and International Sectors.
								Bravos International brings a fresh and innovative approach to
								IT services, acting as liaison between the end-user and the
								Clients. We specialize in providing services in the areas of
								Offshore Software Development Services, Mobile App development,
								Website Design and Development Solutions, Graphic Design and
								Multimedia Solutions, Internet Marketing and Search Engine
								Optimization Solutions, Content writing, Animation Services in
								Nepal.
							</p>
						</div>

						<motion.div
							className="mt-10"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<Button className="bg-orange-600 px-8 py-6 text-lg font-semibold text-white transition-colors hover:bg-orange-700">
								Learn More
							</Button>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
