import Image from "next/image";
import { Button } from "./button";

const NavbarComponent = () => {
    return ( 
        <nav className="flex items-center justify-between p-2 px-[100px] w-full">
        <Image src="/Assets/logo.svg" alt="Printmote logo" width={50} height={30} priority className="lg:w-[150px] sm:w-[100px] h-auto" />
        <Button className="bg-[#6150FF] text-white px-6 py-4 rounded-full hover:bg-[#6150FF]/90 transition">
            Call Me Back
        </Button>
        </nav>
     );
}
 
export default NavbarComponent;