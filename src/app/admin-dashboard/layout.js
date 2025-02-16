import Toast from "@/components/Toast/Toast";

export const metadata = {
  title: "Blaze Gym Fitness - Admin",
  description: "Blaze Gym Fitness: Ignite Your Fitness Journey",
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
