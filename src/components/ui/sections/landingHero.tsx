import Link from "next/link";
import { PiUpload, PiWhatsappLogoBold, PiWhatsappLogoFill } from "react-icons/pi";

const LandingHeroSection = () => {
    return ( 
        <>
        <div className="h-screen px-[10vw] pt-8">
            <h1 className=" font-semibold tracking-tighter lg:text-6xl text-4xl sm:text-5xl md:text-6xl xl:text-7xl text-[#05054E]">Print from anywhere in Accra without leaving your desk.</h1>
            <p className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-700 max-w-2xl px-4 font-medium mx-auto tracking-tight">Business cards, banners, packaging, brand merch and more printed remotely and delivered across Accra.</p>
        {/* CTA Buttons */}
        <div className="actions py-8 flex gap-4 w-full justify-center">
            <Link
              href="/upload"
              className="w-full sm:w-auto bg-[#6150FF] text-white px-6 sm:px-10 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-medium shadow-lg hover:bg-[#6150FF]/90 transition inline-flex items-center justify-center gap-3"
            >
                <PiUpload size={24}/>
              Upload Your Print Job
            </Link>
            <Link
              href="https://wa.me/233XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto border-2 border-[#6150FF] text-[#6150FF] px-6 sm:px-10 py-4 sm:py-5 rounded-xl text-lg sm:text-xl font-medium hover:bg-[#6150FF]/5 transition inline-flex items-center justify-center gap-3"
            >
              <PiWhatsappLogoFill size={24}/>
              Start on WhatsApp
            </Link>
        </div>
        </div>
        </>
     );
}
 
export default LandingHeroSection;