import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CloudUpload, MessageCircle } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative bg-white min-h-screen overflow-hidden">
      {/* Top Banner */}
      <div className="bg-[#0B0C45] text-white text-sm px-4 py-2 flex justify-between items-center">
        <span>Printmote is more than just a business, we are on a mission...</span>
        <Button variant="outline" className="text-white border-white hover:bg-white hover:text-[#0B0C45]">
          Learn why we launched Printmote
        </Button>
      </div>

      {/* Center Content */}
      <main className="flex flex-col items-center justify-center text-center py-20 px-4 relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Image src="/logo-icon.svg" alt="Printmote Logo" width={40} height={40} />
          <h1 className="text-3xl font-bold text-[#0B0C45]">Printmote</h1>
          <span className="text-sm bg-[#0B0C45] text-white rounded px-2 py-0.5">BETA</span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0B0C45] max-w-3xl leading-tight">
          Print in Accra without leaving your Desk.
        </h2>

        {/* Subheadline */}
        <p className="text-gray-700 mt-4 max-w-md text-lg">
          Business cards, banners, packaging, brand merch and more printed remotely and delivered across Accra.
        </p>

        {/* Call to Actions */}
        <div className="mt-8 flex gap-4 flex-wrap justify-center">
          <Button className="flex items-center gap-2 text-white bg-[#6A5AE0] hover:bg-[#5a4ad0]">
            <CloudUpload size={18} /> Upload Request
          </Button>
          <Button variant="outline" className="flex items-center gap-2 border-[#6A5AE0] text-[#6A5AE0] hover:bg-[#f4f4ff]">
            <MessageCircle size={18} /> WhatsApp Request
          </Button>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-sm text-gray-400">
          © 2025 Printmote Tech (CS101203948)
        </footer>
      </main>

      {/* Floating Emojis */}
      <div className="absolute top-20 left-5 animate-float">
        <Image src="/emoji-bag.png" alt="bag emoji" width={50} height={50} />
      </div>
      <div className="absolute top-28 right-5 animate-float-delay">
        <Image src="/emoji-shirt.png" alt="shirt emoji" width={50} height={50} />
      </div>
      <div className="absolute bottom-20 left-10 animate-float-fast">
        <Image src="/emoji-doc.png" alt="doc emoji" width={50} height={50} />
      </div>
      <div className="absolute bottom-20 right-10 animate-float">
        <Image src="/emoji-gift.png" alt="gift emoji" width={50} height={50} />
      </div>
    </div>
  );
}
