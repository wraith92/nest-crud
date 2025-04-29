import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ApexService {
  private readonly API_KEY = process.env.APEX_API_KEY;
  private readonly API_URL = 'https://public-api.tracker.gg/apex/v1/standard/profile';

  async getPlayerStats(platform: number, username: string) {
    try {
      const response = await axios.get(`${this.API_URL}/${platform}/${encodeURIComponent(username)}`, {
        headers: {
          'TRN-Api-Key': this.API_KEY,
          'Accept': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Erreur API: ${error.response?.data?.message || error.message}`);
    }
  }
}