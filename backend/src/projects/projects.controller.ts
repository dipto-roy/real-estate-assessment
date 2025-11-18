import { Controller, Get, Post, Body, Param, UseGuards, ValidationPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body(ValidationPipe) createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }
}
