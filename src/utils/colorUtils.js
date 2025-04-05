// src/utils/colorUtils.js

/**
 * Extract dominant color from an image
 * Note: For a production app, you'd want to use a proper color extraction library
 * like color-thief or dominant-color. This is a simplified version for demo purposes.
 * 
 * @param {String} imageUrl - URL of the image
 * @returns {Promise<string>} - Hex color code
 */
export const extractDominantColor = (imageUrl) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        
        ctx.drawImage(img, 0, 0);
        
        try {
          // Get image data
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
          const colorMap = {};
          let dominant = { color: '#121212', count: 0 };
          
          // Sample pixels (every 5th pixel for performance)
          for (let i = 0; i < imageData.length; i += 20) {
            const r = imageData[i];
            const g = imageData[i + 1];
            const b = imageData[i + 2];
            
            // Skip black/white pixels
            if ((r < 15 && g < 15 && b < 15) || (r > 240 && g > 240 && b > 240)) {
              continue;
            }
            
            const hex = rgbToHex(r, g, b);
            
            if (!colorMap[hex]) {
              colorMap[hex] = 0;
            }
            
            colorMap[hex]++;
            
            if (colorMap[hex] > dominant.count) {
              dominant = { color: hex, count: colorMap[hex] };
            }
          }
          
          resolve(dominant.color);
        } catch (e) {
          reject('#121212'); // Default dark gray
        }
      };
      
      img.onerror = () => {
        reject('#121212');
      };
      
      img.src = imageUrl;
    });
  };
  
  /**
   * Convert RGB values to HEX color code
   * 
   * @param {Number} r - Red (0-255)
   * @param {Number} g - Green (0-255)
   * @param {Number} b - Blue (0-255)
   * @returns {String} - Hex color code
   */
  const rgbToHex = (r, g, b) => {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };