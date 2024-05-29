import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { CreateMapDto } from './dto/create-map.dto';
import { MapService } from './map.service';
import { Response } from 'express';

@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Post()
  async create(@Body() createMapDto: CreateMapDto, @Res() res: Response) {
    const newMarcador = await this.mapService.create(createMapDto);

    return res.json(newMarcador);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const marcadores = await this.mapService.findAll();

    return res.json(marcadores);
  }

  @Put()
  async updateMarcador(@Body() createMapDto: CreateMapDto, @Res() res: Response){
    const udpatedMarcador = await this.mapService.update(createMapDto);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number, @Res() res: Response) {
    const deletedMarcador = await this.mapService.remove(id);

    return res.json({
      msg: 'Marcador eliminado'
    });

  }

  }

