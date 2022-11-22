import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import LoginConsumer from './login/login.consumer';
import { LoginProducer } from './login/login.producer';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
      },
      limiter: {
        max: 2,
        duration: 1000,
      },
    }),
    BullModule.registerQueue({
      name: 'login-queue',
    }),
  ],
  providers: [LoginProducer, LoginConsumer],
  exports: [LoginProducer],
})
export class BullQueueModule {}
