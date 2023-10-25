import type { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';
import VideoService from '../../../../services/VideoService';

/**
 * @description - get Profile after send page to browser.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return user profile basic data like username and avatar.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function Video(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const data = await VideoService.getVideo(
        typeof req.query.username === 'string'
          ? req.query.username
          : req.query?.username[0],
      );
      const formatData = data.map((rank) =>
        _.mapKeys(rank.fields, (v, k) => _.camelCase(k)),
      );
      res.send(formatData);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: 'Server Error' });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default Video;
