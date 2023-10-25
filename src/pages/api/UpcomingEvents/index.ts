import type { NextApiRequest, NextApiResponse } from 'next';
import Competitions from '../../../../services/Competitions';
import SeminarsService from '../../../../services/SeminarsService';
import UpcomingEvents from '../../../../services/UpcomingEvents';

/**
 * @description - get events data against a specific user.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return events data against a specific user.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
async function UpcomingEventsAPI(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET' && req.query.recordId && req.query.eventType) {
    try {
      if (req.query.eventType === 'seminar') {
        const data = await SeminarsService.getSeminarById(req.query.recordId);
        res.send(data);
      } else if (req.query.eventType === 'competition') {
        const data = await Competitions.getCompetition(req.query.recordId);
        res.send(data);
      }
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'GET' && req.query?.offset) {
    try {
      const data = await UpcomingEvents.getEvents(
        parseInt(req.query?.offset as string),
        req.query?.countries && JSON.parse(req.query?.countries as string),
      );
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      const data = await UpcomingEvents.getAllEvents(
        parseInt(req.query.pageNo as string),
      );
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: 'Server Error' });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default UpcomingEventsAPI;
