import Image from "next/image";

const Logo = () => {
  return (
    <Image
      alt="logo"
      width={100}
      height={100}
      src="/images/logooo.png"
      priority
      style={{ height: "auto", width: "auto" }}
    />
  );
};

export default Logo;
