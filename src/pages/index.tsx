import Head from "next/head";
import HexConverter from "@/components/HexConverter";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div>
      <Head>
        <title>HEX Converter - RGB, HSL, CMYK</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HexConverter />
      <Footer />
    </div>
  );
};

export default Home;
