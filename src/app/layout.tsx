import "../styles/globals.css";
import "@/styles/main.css";
import Provider from "@/provider";
import ScrollSmootherComponent from "@/components/tools/ScrollSmoother";
import ToolsComponent from "@/components/tools";
import ScrollTop from "@/components/tools/ScrollTop";
import AiHeader from "@/components/headers/AiHeader";
import Footer6 from "@/components/footer/Footer6";
import navigation from "@/config/navigation.json";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body suppressHydrationWarning={true}>
        <Provider>
          <div className="teko-font root-layout" {...{ "theme-setting": "style-3" }}>
             <ScrollSmootherComponent />
             <ToolsComponent />
             <ScrollTop />
             <div id="smooth-wrapper">
                <div id="smooth-content">
                  <AiHeader />
                  <div>{children}</div>
                  <Footer6 />
                </div>
             </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
