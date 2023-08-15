import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { execSync } from 'child_process';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { google, drive_v3 } from 'googleapis';


@Injectable()
export class BuckupService implements OnApplicationBootstrap {
  private client: any; // The OAuth2 client

  constructor(private readonly configService: ConfigService) {
    console.log("CLIENT ID ", this.configService.get<string>('driveClientId'))

    this.client = new google.auth.OAuth2(
        this.configService.get<string>('driveClientId'),
        this.configService.get<string>('driveClientSecret'),
        this.configService.get<string>('driveRedirectUri')
    );

    this.client.setCredentials({
        refresh_token:
            this.configService.get<string>('driveRefreshToken')
    });
}
  async onApplicationBootstrap() {

    console.log(process.env.postgressUri);
    console.log(process.env.isDumping);
    if (process.env.isDumping == 'true') {
      switch (process.env.DBType) {
        case 'postgress':
          await this.DumpPostgress();
          break;

        default:
          break;
      }
    } else {
      switch (process.env.DBType) {
        case 'postgress':
          await this.restorePostgress();
          break;

        default:
          break;
      }
    }
  }
  async DumpPostgress() {
    await execSync(
      `pg_dump --dbname=${process.env.postgressUri} --file=dumpData.tar --format=tar --data-only --no-owner --no-acl`,
    );
    return 'Dumped Successfully';
  }
  async restorePostgress() {
    await execSync(
      `pg_restore --dbname=${process.env.postgressUri}  dumpData.tar`,
    );
    return 'Restored Successfully';
  }

  async sendSlackMessage(message: string, title: string) {
    try {
      const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
      const payload = {
        channel: process.env.SLACK_CHANNEL,// UPDATE
        attachments: [
          {
            title /*  'ERROR in Queue QRCODE-GENERATION' */,
            text: `${message}`,
            author_name: 'QARA HSE',
            color: '#00FF00',
          },
        ],
      };
      const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
        Accept: 'application/json',
      };
      const { data } = await axios.post(
        'https://slack.com/api/chat.postMessage',
        payload,
        {
          headers,
        },
      );
    } catch (err) {
      console.log(err);
    }
  }
}
