import type { NextApiRequest, NextApiResponse } from 'next';
import PrivateClassesService from '../../../../services/PrivateClassesService';

/**
 * @description - get private classes list against a specific user.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return private classes list against a specific user.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function PrivateClasses(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.detailed && req.method === 'GET') {
    try {
      const data = await PrivateClassesService.getDetailedClasses(
        typeof req.query.username === 'string'
          ? req.query.username
          : req.query?.username[0],
      );
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.query.bookings && req.method === 'GET') {
    try {
      const data = await PrivateClassesService.getBookings(
        typeof req.query.username === 'string'
          ? req.query.username
          : req.query?.username[0],
      );
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      const data = await PrivateClassesService.getClasses(
        typeof req.query.username === 'string'
          ? req.query.username
          : req.query?.username[0],
      );
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const data = await PrivateClassesService.createBooking(req.body);
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const data = await PrivateClassesService.paymentConfirmation(
        req.body.id,
        req.body.stripeId,
        req.body.email,
      );
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default PrivateClasses;
