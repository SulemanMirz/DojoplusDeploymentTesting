/* eslint-disable class-methods-use-this */
import axios from 'axios';

class YoutubeService {
  /**
   * @description - get Profile after send page to browser.
   * @param username - Username.
   * @returns - Return user profile basic data like username and avatar.
   */

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async getChannelVideos(serviceParam) {
    try {
      const records = await axios(
        'https://www.googleapis.com/youtube/v3/search',
        {
          params: {
            ...serviceParam,
            key: process.env.GOGGLE_CONSOLE_API_KEY,
            part: 'id,snippet',
            order: 'date',
            maxResults: 9,
          },
        },
      );
      return records.data.items;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new YoutubeService();
