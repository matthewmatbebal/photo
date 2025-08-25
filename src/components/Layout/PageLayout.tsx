// src/components/Layout/PageLayout.tsx
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

interface PageLayoutProps {
  children: React.ReactNode;
  headerWhiteText?: boolean;
}

export default function PageLayout({
  children,
  headerWhiteText = false,
}: PageLayoutProps) {
  return (
    <>
      <Header whiteText={headerWhiteText} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
