import "./global.css";

export const metadata = {
  title: "React Money Input",
  description: "TBD",
};

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = async ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        {/* Inter and Arimo */}
        <link
          href="https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400..700;1,400..700&family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <main>{children}</main>
        <footer>
          <p className="text-sm text-center text-gray-500">
            © {new Date().getFullYear()} React Money Input. All rights
          </p>
        </footer>
      </body>
    </html>
  );
};

export default Layout;
