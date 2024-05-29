import { Inject, Injectable } from '@nestjs/common';
import { CreateMapDto } from './dto/create-map.dto';
import { Marcadores } from './entities/map.entity';
import { where } from 'sequelize';

@Injectable()
export class MapService {
  constructor(@Inject('marcadoresRepository') private marcadoresModel: typeof Marcadores){}

  create(createMapDto: CreateMapDto) {
    return this.marcadoresModel.create({...createMapDto})
  }

  findAll() {
    return this.marcadoresModel.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} map`;
  }

  update(createMapDto: CreateMapDto) {
    return this.marcadoresModel.update(createMapDto, {
      where: {
        idMarcador: createMapDto.idMarcador
      }
    })
  }

  remove(id: number) {
    return this.marcadoresModel.destroy({
      where: {
        idMarcador: id
      }
    })
  }
}
