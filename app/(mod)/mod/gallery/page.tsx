"use client";
import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useAuthStore } from "@/lib/stores/authStore";
import { client_databases, client_storage } from "@/lib/appwrite/client-config";

interface imageInterface {
	title: string;
	description: string;
	imageId: string;
}

export default function GalleryPage() {
	const [images, setImages] = useState<imageInterface[]>([]);
	const router = useRouter();
	const [selectedImage, setSelectedImage] = useState(null);
	const { user } = useAuthStore();

	useEffect(() => {
		async function fetchImages() {
			try {
				const response = await client_databases.listDocuments(
					process.env.NEXT_PUBLIC_DATABASEID as string,
					process.env.NEXT_PUBLIC_GALLERY_ID as string,
				);
				console.log("running....");
				setImages(response.documents);
			} catch (error) {
				console.error("Error fetching images:", error);
			}
		}
		fetchImages();
	}, []);

	return (
		<div className="p-4">
			<div className="flex justify-end mb-4">
				<Button onClick={() => router.push("/mod/gallery/create")}>
					Upload Image
				</Button>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{images.map((image: imageInterface) => (
					<Card
						key={image.$id}
						className="cursor-pointer"
						onClick={() => setSelectedImage(image)}
					>
						<CardHeader>
							<CardTitle>{image.title}</CardTitle>
							<CardDescription>{image.description}</CardDescription>
						</CardHeader>
						<CardContent>
							<Image
								src={`${
									client_storage.getFileView(
										process.env.NEXT_PUBLIC_BUCKETID as string,
										image.imageId,
									).href
								}&project=${process.env.NEXT_PUBLIC_PROJECTID}&mode=admin`}
								alt={image.title}
								width={500}
								height={300}
								className="w-full h-auto object-cover"
							/>
						</CardContent>
					</Card>
				))}
			</div>
			<Dialog
				open={!!selectedImage}
				onOpenChange={() => setSelectedImage(null)}
			>
				<DialogContent className="sm:max-w-[425px]">
					{selectedImage && (
						<>
							<DialogHeader>
								<DialogTitle>{selectedImage.title}</DialogTitle>
								<DialogDescription>
									{selectedImage.description}
								</DialogDescription>
							</DialogHeader>
							<Image
								src={`${
									client_storage.getFileView(
										process.env.NEXT_PUBLIC_BUCKETID as string,
										selectedImage.imageId,
									).href
								}&project=${process.env.NEXT_PUBLIC_PROJECTID}&mode=admin`}
								alt={selectedImage.title}
								width={800}
								height={600}
								className="w-full h-auto object-contain"
							/>
							<div className="mt-4 flex justify-between">
								<Button
									onClick={() =>
										router.push(`/mod/gallery/update/${selectedImage.$id}`)
									}
								>
									Update
								</Button>
								<Button
									variant="destructive"
								>
									Delete
								</Button>
							</div>
						</>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
