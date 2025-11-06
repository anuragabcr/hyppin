import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface GalleryImage {
  id: number;
  url: string;
  alt: string;
}

interface LightboxModalProps {
  image: GalleryImage | null;
  onClose: () => void;
}

const LightboxModal: React.FC<LightboxModalProps> = ({ image, onClose }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!image || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl max-h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/80 rounded-full p-2 hover:bg-white transition"
        >
          <X size={24} />
        </button>
        <Image
          width={1200}
          height={800}
          src={image.url}
          alt={image.alt}
          unoptimized
          className="w-auto h-auto min-w-full min-h-[80vh] object-contain rounded-lg"
        />
        <p className="absolute bottom-4 text-center text-white text-lg font-medium">
          {image.alt}
        </p>
      </div>
    </div>,
    document.body,
  );
};

export default LightboxModal;
