import { HttpStatus, NotFoundException, Param } from '@nestjs/common';
import { Controller, Get, HttpException } from '@nestjs/common';
import { CoverageByCepService } from './coverage-by-cep.service';
import { CoverageByCep } from './entities/coverage-by-cep.entity';

@Controller('coverage-by-cep')
export class CoverageByCepController {
  constructor(private readonly coverageByCepService: CoverageByCepService) {}

  // @Get(':cep')
  // async findByCep(@Param('cep') cep: string): Promise<CoverageByCep> {
  //   return this.coverageByCepService.findByCep(cep);
  // }

  @Get(':cep')
  async findByCep(@Param('cep') cep: string): Promise<CoverageByCep> {
    try {
      return await this.coverageByCepService.findByCep(cep);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            title: '',
            text: 'Nenhuma cidade foi encontrada com este CEP.',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw new HttpException('Erro interno do servidor', 500);
      }
    }
  }
}
