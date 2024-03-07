import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../config/database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './models/user/user.module';
import { PostModule } from './models/post/post.module';
import { FollowerModule } from './models/follower/follower.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, PostModule, FollowerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
