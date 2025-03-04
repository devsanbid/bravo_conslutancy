import { getImages } from '@/controllers/GalleryController';
import Image from 'next/image';

const GalleryPage = async () => {

  return (
    <div>
        <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Gallery</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        </div>
        </div>
    </div>
  );
};

export default GalleryPage;
