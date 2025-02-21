import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { DrawService } from './draw.service';

@Controller('draw')
export class DrawController {
  constructor(private readonly drawService: DrawService) {}

  @Get('image-me-guild-welcome')
  getImage(@Res() res: Response) {
    const imageBuffer = this.drawService.generateImage();
    res.setHeader('Content-Type', 'image/png');
    res.send(imageBuffer);
  }
}
