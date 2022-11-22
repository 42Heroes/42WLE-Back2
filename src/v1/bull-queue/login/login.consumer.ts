import { Process, Processor } from '@nestjs/bull';
import { ConflictException } from '@nestjs/common';
import { DoneCallback, Job } from 'bull';

@Processor('login-queue')
export default class LoginConsumer {
  @Process('get-profile')
  async getProfile(job: Job, done: DoneCallback) {
    const { url, accessToken } = job.data;
    let response;
    try {
      response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      throw new ConflictException(error, 'Error while fetching profile');
    }
    if (response.status !== 200) {
      throw new ConflictException('Error while fetching profile');
    }
    try {
      const profile = await response.json();
      done(null, profile);
    } catch (error) {
      throw new ConflictException(error, 'Error while parsing profile');
    }
  }
}
