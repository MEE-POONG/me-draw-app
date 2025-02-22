import { Injectable } from '@nestjs/common';
import { createCanvas, loadImage, registerFont } from 'canvas';
import * as path from 'path';

@Injectable()
export class DrawService {
  constructor() {
    // Register the Sriracha font
    const fontPath = path.join(__dirname, '../assets/Sriracha-Regular.ttf');
    console.log('Font path:', fontPath);
    registerFont(fontPath, {
      family: 'Sriracha',
    });
  }

  async generateImage(): Promise<Buffer> {
    const width = 840;
    const height = 460;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // โหลดพื้นหลังจาก URL
    const backgroundURL = 'https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/7d13d5b4-627a-480e-a2f2-4a62cc49e100/wlg';
    const backgroundImage = await loadImage(backgroundURL);
    ctx.drawImage(backgroundImage, 0, 0, width, height);

    // โหลดรูปโปรไฟล์
    const avatarURL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYBdpodxuoLjiLfacMvT4HSFnxRF5bw7MB9w&s';
    const avatarImage = await loadImage(avatarURL);

    // ขนาดและตำแหน่งของ Avatar
    const avatarSize = 150; // กำหนดขนาด Avatar เป็น 150x150
    const avatarX = width / 2 - avatarSize / 2;
    const avatarY = height / 2 - avatarSize / 2;

    // คลิปเป็นวงกลม
    ctx.save();
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, avatarSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // วาดรูปโปรไฟล์
    ctx.drawImage(avatarImage, avatarX, avatarY, avatarSize, avatarSize);
    ctx.restore(); // คืนค่าการตั้งค่า context

    // เพิ่มข้อความทักทาย
    ctx.fillStyle = '#000000';
    ctx.font = '30px Sriracha';
    ctx.textAlign = 'center';
    ctx.fillText('Hello MeGuild', width / 2, height - 50);

    // Return image as Buffer
    return canvas.toBuffer('image/png');
  }

  async generateImageMeGuildWelcome(data: {
    displayName: string;
    avatar: string;
  }): Promise<Buffer> {
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
    ctx.beginPath();
    ctx.arc(300, 200, 75, 0, Math.PI * 2);
    ctx.fill();

    // โหลดภาพโปรไฟล์
    const innerImage = await loadImage(data.avatar);
    ctx.drawImage(innerImage, 100, 100, 100, 100);
    ctx.restore();

    // Add text with Sriracha font
    ctx.fillStyle = '#000000';
    ctx.font = '30px Sriracha';
    ctx.fillText(`Hello ${data.displayName}`, 100, 400);

    // Return image as Buffer
    return canvas.toBuffer('image/png');
  }
}
