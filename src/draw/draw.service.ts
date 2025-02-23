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
    const backgroundURL = 'https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/49cf9f2a-5195-404f-bf43-dfbf75623a00/wlg';
    const backgroundImage = await loadImage(backgroundURL);
    ctx.drawImage(backgroundImage, 0, 0, width, height);

    // โหลดรูปโปรไฟล์
    const avatarURL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYBdpodxuoLjiLfacMvT4HSFnxRF5bw7MB9w&s';
    const avatarImage = await loadImage(avatarURL);

    // ขนาดและตำแหน่งของ Avatar
    const avatarSize = 220; // ขนาด Avatar
    const avatarX = width / 2 - avatarSize / 2;
    const avatarY = height / 2 - avatarSize / 2;

    // Clip เป็นวงกลม (ต้องเซฟ context ก่อน)
    ctx.save();
    ctx.beginPath();
    ctx.arc(width / 2, avatarY + avatarSize / 2 - 20, avatarSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // วาดรูปโปรไฟล์ (เลื่อนขึ้น)
    ctx.drawImage(avatarImage, avatarX, avatarY - 20, avatarSize, avatarSize);
    ctx.restore(); // คืนค่า context

    // วาดขอบเรืองแสงรอบ Avatar
    ctx.save();
    ctx.beginPath();
    ctx.arc(width / 2, avatarY + avatarSize / 2 - 20, avatarSize / 2 + 1, 0, Math.PI * 2);
    ctx.closePath();

    // กำหนดเงาเรืองแสง
    ctx.shadowColor = "rgb(0, 26, 255,0.8)"; // สีฟ้าเรืองแสง
    ctx.shadowBlur = 5;
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
    ctx.stroke();
    ctx.restore();

    function drawNeonText(text, size, x, y, color, inline) {
      const blur = 5;
      ctx.font = `${size} Sriracha`;
      ctx.textAlign = 'center';
      ctx.shadowColor = color;
      ctx.shadowBlur = blur;
      ctx.fillStyle = '#ffffff';
      ctx.fillText(text, x, y);
      // เพิ่มเส้นรอบฟอนต์ (Stroke)
      ctx.lineWidth = 1;
      ctx.strokeStyle = inline;
      ctx.strokeText(text, x, y);
    }

    // เพิ่มข้อความทักทาย
    drawNeonText('Welcome To', `30px`, width / 2, 30, 'rgb(161, 255, 161)', 'rgb(96, 104, 219)');
    drawNeonText('Me Guild Online', `40px`, width / 2, 70, 'rgb(161, 255, 161)', 'rgb(96, 104, 219)');
    drawNeonText(`Me Guild Online`, `45px`, width / 2, height - 65, 'rgb(161, 255, 161)', 'rgb(96, 104, 219)');
    drawNeonText('ยินดีต้อนรับผู้มาเยือน', `30px`, width / 2, height - 25, 'rgb(161, 255, 161)', 'rgb(96, 104, 219)');

    // Return image as Buffer
    return canvas.toBuffer('image/png');
  }

  async generateImageMeGuildWelcome(data: { displayName: string; avatar: string; }): Promise<Buffer> {
    const width = 840;
    const height = 460;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // โหลดพื้นหลังจาก URL
    const backgroundURL = 'https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/49cf9f2a-5195-404f-bf43-dfbf75623a00/wlg';
    const backgroundImage = await loadImage(backgroundURL);
    ctx.drawImage(backgroundImage, 0, 0, width, height);

    // โหลดรูปโปรไฟล์
    const avatarImage = await loadImage(data.avatar);
    const avatarSize = 220;
    const avatarX = width / 2 - avatarSize / 2;
    const avatarY = height / 2 - avatarSize / 2;

    // Clip เป็นวงกลม
    ctx.save();
    ctx.beginPath();
    ctx.arc(width / 2, avatarY + avatarSize / 2 - 20, avatarSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatarImage, avatarX, avatarY - 20, avatarSize, avatarSize);
    ctx.restore();

    // วาดขอบเรืองแสงรอบ Avatar
    ctx.save();
    ctx.beginPath();
    ctx.arc(width / 2, avatarY + avatarSize / 2 - 20, avatarSize / 2 + 1, 0, Math.PI * 2);
    ctx.closePath();
    ctx.shadowColor = "#78d9e3";
    ctx.shadowBlur = 5;
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
    ctx.stroke();
    ctx.restore();

    function drawNeonText(text, size, x, y, color, inline) {
      const blur = 5;
      ctx.font = `${size} Sriracha`;
      ctx.textAlign = 'center';
      ctx.shadowColor = color;
      ctx.shadowBlur = blur;
      ctx.fillStyle = '#ffffff';
      ctx.fillText(text, x, y);
      // เพิ่มเส้นรอบฟอนต์ (Stroke)
      ctx.lineWidth = 1;
      ctx.strokeStyle = inline;
      ctx.strokeText(text, x, y);
    }

    drawNeonText('Welcome', `45px`, width / 2, 50, 'rgb(161, 255, 161)', 'rgb(96, 104, 219)');
    drawNeonText('Me-Guild-Online', `50px`, width / 2, 50, 'rgb(161, 255, 161)', 'rgb(96, 104, 219)');
    drawNeonText(data.displayName, `45px`, width / 2, height - 65, 'rgb(161, 255, 161)', 'rgb(96, 104, 219)');
    drawNeonText('ยินดีต้อนรับผู้มาเยือน', `30px`, width / 2, height - 25, 'rgb(161, 255, 161)', 'rgb(96, 104, 219)');

    return canvas.toBuffer('image/png');
  }
}
