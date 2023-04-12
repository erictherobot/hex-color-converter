import Head from "next/head";
import HexConverter from "@/components/HexConverter";

const Home = () => {
  return (
    <div>
      <Head>
        <title>HEX Converter - RGB, HSL, CMYK</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HexConverter />
    </div>
  );
};

export default Home;
