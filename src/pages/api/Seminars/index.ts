import type { NextApiRequest, NextApiResponse } from 'next';
import SeminarsService from '../../../../services/SeminarsService';

/**
 * @description - get seminars data against a specific user.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return seminars data against a specific user.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function Seminars(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET' && req.query.single) {
    try {
      const data = await SeminarsService.getSeminar(
        typeof req.query.title === 'string'
          ? req.query.title
          : req.query?.title[0],
      );

      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      const data = await SeminarsService.getSeminars(
        typeof req.query.username === 'string'
          ? req.query.username
          : req.query?.username[0],
      );
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const data = await SeminarsService.createTicket(req.body);
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default Seminars;
