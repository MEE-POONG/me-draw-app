import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { DrawService } from './draw.service';

@Controller('draw')
export class DrawController {
  constructor(private readonly drawService: DrawService) { }

  @Get('image')
  async getImage(@Res() res: Response) {
    const imageBuffer = await this.drawService.generateImage();
    res.setHeader('Content-Type', 'image/png');
    res.send(imageBuffer);
  }

  @Post('image-me-guild-welcome')
  async getImageMeGuildWelcome(
    @Res() res: Response,
    @Body() data: { text1?: string; text2?: string; displayName?: string; avatar?: string; bgImg?: string; widthImg?: string; height?: string },
  ) {
    // กำหนดค่าตั้งต้นหากไม่มีข้อมูลส่งมา
    const defaultData = {
      text1: data.text1 || 'aaa',
      text2: data.text2 || 'aaa',
      displayName: data.displayName || 'Guest',
      avatar: data.avatar || 'default-avatar.png',
      bgImg: data.bgImg || 'default-bg.png',
      widthImg: data.widthImg || '500',
      height: data.height || '500',
    };

    const imageBuffer = await this.drawService.generateImageMeGuildWelcome(defaultData);
    res.setHeader('Content-Type', 'image/png');
    res.send(imageBuffer);
  }
}
