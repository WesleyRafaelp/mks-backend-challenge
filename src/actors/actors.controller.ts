import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ActorsService } from './actors.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

@ApiTags('Actors')
@Controller('actors')
export class ActorsController {
  constructor(private readonly actorService: ActorsService) {}

  @Post()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  create(@Body() createActorDto: CreateActorDto) {
    return this.actorService.create(createActorDto);
  }

  @Get()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.actorService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.actorService.findOne(+id);
  }

  @Get(':id/movies')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  findActorMovies(@Param('id') id: string) {
    return this.actorService.findActorMovies(+id);
  }

  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateActorDto: UpdateActorDto) {
    return this.actorService.update(+id, updateActorDto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.actorService.remove(+id);
  }
}
