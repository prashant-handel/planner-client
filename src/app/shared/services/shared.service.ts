import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  getRandomVibrantColorRGB() {
  const randChannel = () => Math.floor(100 + Math.random() * 155); // 100–255
  let r = randChannel();
  let g = randChannel();
  let b = randChannel();

  // To make it more vibrant, randomly zero out one channel
  const zeroOut = Math.floor(Math.random() * 3);
  if (zeroOut === 0) r = 0;
  else if (zeroOut === 1) g = 0;
  else b = 0;

  return this.rgbToHex(r, g, b);
}

rgbToHex(r:Number, g: Number, b: Number) {
  return (
    '#' +
    [r, g, b]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('')
  );
}

}
