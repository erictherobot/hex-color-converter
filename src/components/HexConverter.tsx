import { useRef, useState } from "react";
import chroma from "chroma-js";
import tinycolor from "tinycolor2";

const HexConverter = () => {
  const [hexCode, setHexCode] = useState("");
  const [rgb, setRgb] = useState("");
  const [hsl, setHsl] = useState("");
  const [cmyk, setCmyk] = useState("");

  const handleHexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputHex = event.target.value.trim();
    if (!isValidHex(inputHex)) {
      resetColorValues();
      setHexCode(inputHex.toUpperCase());
      return;
    }
    setHexCode(inputHex.toUpperCase());
    convertColor(inputHex);
  };

  const resetColorValues = () => {
    setRgb("");
    setHsl("");
    setCmyk("");
  };

  const isValidHex = (hex: string) => {
    return /^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex);
  };

  const convertColor = (hex: string) => {
    if (!isValidHex(hex)) {
      resetColorValues();
      return;
    }
    setTimeout(() => {
      const color = chroma(hex);

      setRgb(chroma(color).css());
      setHsl(chroma(color).hsl().toString());
      setCmyk(tinycolor(hex).toString());
      if (lastResultRef.current) {
        const resultHtml = lastResultRef.current.innerHTML;
        console.log(resultHtml);
      }
    }, 1000);
  };

  const getContrastingTextColor = (backgroundColor: string) => {
    const color = chroma.valid(backgroundColor) ? backgroundColor : "#FFFFFF"; // add a check for valid color value
    const luminance = chroma(color).luminance();
    return luminance > 0.5 ? "#000" : "#fff";
  };

  const colorResultStyle = (color: string) => {
    return {
      backgroundColor: color,
      color: getContrastingTextColor(color),
      borderColor: color,
    };
  };

  const lastResultRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4 text-white">
        HEX to RGB, HSL, CMYK Converter{" "}
      </h1>
      <div className="w-full max-w-md">
        <div className="mt-4">
          <label htmlFor="hexCode" className="block text-white font-bold mb-2">
            HEX Code
          </label>
          <input
            id="hexCode"
            name="hexCode"
            type="text"
            value={hexCode}
            onChange={handleHexChange}
            placeholder="#000000"
            maxLength={6}
            tabIndex={0}
            aria-label="Input field for HEX color code"
            className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {rgb && (
          <div className="mt-4">
            <label
              className="block text-white font-bold mb-2"
              tabIndex={0}
              aria-label="RGB color value label"
            >
              RGB
            </label>
            <div
              className="border rounded p-4"
              style={colorResultStyle(rgb)}
              tabIndex={0}
              aria-label="RGB color value"
              ref={lastResultRef}
            >
              {rgb}
            </div>
          </div>
        )}
        {hsl && (
          <div className="mt-4">
            <label
              className="block text-white font-bold mb-2"
              tabIndex={0}
              aria-label="HSL color value label"
            >
              HSL
            </label>
            <div
              className="border rounded p-4"
              style={colorResultStyle(hsl)}
              tabIndex={0}
              aria-label="HSL color value"
              ref={lastResultRef}
            >
              {hsl}
            </div>
          </div>
        )}
        {/* {cmyk && (
          <div className="mt-4">
            <label
              className="block text-white font-bold mb-2"
              tabIndex={0}
              aria-label="CMYK color value label"
            >
              CMYK
            </label>
            <div
              className="border rounded p-4"
              style={colorResultStyle(cmyk)}
              tabIndex={0}
              aria-label="CMYK color value"
              ref={lastResultRef}
            >
              {cmyk}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default HexConverter;
