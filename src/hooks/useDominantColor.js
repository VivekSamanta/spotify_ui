import { useState, useEffect } from 'react';
import Vibrant from 'node-vibrant';

const getLuminance = ([r, g, b]) => {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const useDominantColor = (imageSrc) => {
  const [dominantColor, setDominantColor] = useState('#111');

  useEffect(() => {
    if (!imageSrc) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;

    img.onload = () => {
      Vibrant.from(img)
        .getPalette()
        .then((palette) => {
          let darkest = '#111';
          let minLuminance = 999;

          Object.values(palette).forEach((swatch) => {
            if (swatch) {
              const luminance = getLuminance(swatch.rgb);
              if (luminance < minLuminance) {
                minLuminance = luminance;
                darkest = swatch.getHex();
              }
            }
          });

          setDominantColor(darkest);
        })
        .catch((err) => {
          console.error('Vibrant error:', err);
          setDominantColor('#111');
        });
    };
  }, [imageSrc]);

  return dominantColor;
};

export default useDominantColor;