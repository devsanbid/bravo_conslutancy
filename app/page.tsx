import AboutSectionFrame from "@/components/main/AboutSectionFrame";
import ContactSectionFrame from "@/components/main/ContactSectionFrame";
import Footer from "@/components/main/Footer";
import ImageSlider from "@/components/main/ImageSlider";
import Navbar from "@/components/main/Navbar";
import RecentBlogSection from "@/components/main/RecentBlogSection";
import StudentServicesFrame from "@/components/main/StudentServiceFrame";
import TestimonialSlider from "@/components/main/Testimonial";
//import WorldMap from "@/components/main/WorldMap";

export default function Home() {
	return (
		<div>
			<Navbar />
			<ImageSlider />
			<AboutSectionFrame />
			<StudentServicesFrame />
			<ContactSectionFrame />
			<TestimonialSlider />
			<RecentBlogSection />
			 {/* <WorldMap /> */}
			<Footer />
		</div>
	);
}
