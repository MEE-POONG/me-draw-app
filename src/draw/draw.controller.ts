import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { DrawService } from './draw.service';

@Controller('draw')
export class DrawController {
  constructor(private readonly drawService: DrawService) {}

  @Get('image')
  getImage(@Res() res: Response) {
    const imageBuffer = this.drawService.generateImage();
    res.setHeader('Content-Type', 'image/png');
    res.send(imageBuffer);
  }

  @Post('image-me-guild-welcome')
  async getImageMeGuildWelcome(
    @Res() res: Response,
    @Body() data: { displayName: string; avatar: string },
  ) {
    const imageBuffer =
      await this.drawService.generateImageMeGuildWelcome(data);
    res.setHeader('Content-Type', 'image/png');
    res.send(imageBuffer);
  }
}
