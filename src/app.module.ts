import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '',
      port: 5432,
      username: 'postgres',
      password: 'demodb123',
      database: 'demodb',
      autoLoadEntities: true,
      synchronize: true
    })
  ],
})
export class AppModule {}
