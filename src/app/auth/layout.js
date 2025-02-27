import Toast from "@/components/Toast/Toast";

export const metadata = {
  title: "Blaze Gym Fitness - Login",
  description:
    "Join Blaze Gym Fitness and ignite your fitness journey with expert coaching and top-tier equipment.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toast />
        {children}
      </body>
    </html>
  );
}
