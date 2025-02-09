import Image from "next/image";
import { FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";

const BankDetails = () => {
  return (
    <div className="py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm text-gray-500">
          Blaze Gym Fitness reserves the right to verify, accept or reject
          membership
        </p>

        <div className="flex flex-col items-center my-4">
          <div className="relative h-60 w-60">
            <Image
              layout="fill"
              alt="Bank Logo"
              objectFit="contain"
              src="/images/UBA-logo.png"
            />
          </div>

          <div>
            <p className="text-2xl uppercase font-bold">Bank Name</p>
            <p className="text-2xl uppercase">UBA Bank</p>
          </div>

          <div className="w-full h-[2px] my-4 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          <div>
            <p className="text-2xl uppercase font-bold">Account Number</p>
            <p className="text-2xl uppercase">1234567890</p>
          </div>
        </div>

        <p className="text-sm text-gray-500 my-8">
          After payment, kindly reach out to us with a copy of your receipt via
          any of our channels below
        </p>

        {/* Contact Detail */}
        <div className="flex flex-col items-center">
          <div className="flex flex-col gap-5 text-primary">
            <div className="flex items-center text-start">
              <FaWhatsapp className="text-2xl mr-3" /> <p>+1 (123) 456-7890</p>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="text-2xl mr-3" />{" "}
              <p>contact@yourgym.com</p>
            </div>
            <div className="flex items-center">
              <FaPhoneAlt className="text-2xl mr-3" /> <p>+1 (123) 456-7890</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
