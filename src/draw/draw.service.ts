import { Injectable } from '@nestjs/common';
import { createCanvas, registerFont } from 'canvas';
import * as path from 'path';

@Injectable()
export class DrawService {
  constructor() {
    // Register the Chonburi font
    const fontPath = path.join(__dirname, '../assets/Chonburi-Regular.ttf');
    console.log('Font path:', fontPath);
    registerFont(fontPath, {
      family: 'Chonburi',
    });
  }

  generateImage(): Buffer {
    const width = 500;
    const height = 500;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Background color
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // Draw a rectangle
    ctx.fillStyle = '#FF5733';
    ctx.fillRect(50, 50, 200, 150);

    // Draw a circle
    ctx.fillStyle = '#3498DB';
    ctx.beginPath();
    ctx.arc(300, 200, 75, 0, Math.PI * 2);
    ctx.fill();

    // Add text with Chonburi font
    ctx.fillStyle = '#000000';
    ctx.font = '30px Chonburi';
    ctx.fillText('Hello Canvas!', 100, 400);

    // Return image as Buffer
    return canvas.toBuffer('image/png');
  }
}
