import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActorsService } from './actors.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

@ApiTags('Actors')
@Controller('actors')
export class ActorsController {
  constructor(private readonly actorService: ActorsService) {}

  @Post()
  create(@Body() createActorDto: CreateActorDto) {
    return this.actorService.create(createActorDto);
  }

  @Get()
  findAll() {
    return this.actorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actorService.findOne(+id);
  }

  @Get(':id/movies')
  findActorMovies(@Param('id') id: string) {
    return this.actorService.findActorMovies(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateActorDto: UpdateActorDto) {
    return this.actorService.update(+id, updateActorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actorService.remove(+id);
  }
}
