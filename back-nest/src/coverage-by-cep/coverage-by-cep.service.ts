import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoverageByCep } from './entities/coverage-by-cep.entity';

@Injectable()
export class CoverageByCepService {
  constructor(
    @InjectRepository(CoverageByCep)
    private readonly coverageByCepRepository: Repository<CoverageByCep>,
  ) {}
  async findByCep(cep: string): Promise<CoverageByCep> {
    const cepEntity = await this.coverageByCepRepository.findOne({
      where: { cep: cep },
    });
    if (!cepEntity) {
      throw new NotFoundException(
        'Nenhuma cidade foi encontrada com este CEP.',
      );
    }
    return cepEntity;
  }
}
