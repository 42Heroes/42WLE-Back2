import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class LoginProducer {
  constructor(@InjectQueue('login-queue') private loginQueue: Queue) {}
  async addjob(accessToken) {
    const url = `https://api.intra.42.fr/v2/me`;
    const job = await this.loginQueue.add(
      'get-profile',
      {
        url,
        accessToken,
      },
      { attempts: 5, backoff: 1000 },
    );
    return await job.finished();
  }
}
