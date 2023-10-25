import type { NextApiRequest, NextApiResponse } from 'next';
import requestIp from 'request-ip';
import CheckIns from '../../../../services/CheckIns';

/**
 * @description - get check-in details for a specific user.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return check-in details for a specific user.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
async function CheckIn(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET' && req.query.classId) {
    try {
      const data = await CheckIns.getClassDetail(
        typeof req.query.classId === 'string'
          ? req.query.classId
          : req.query?.classId[0],
      );
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'GET' && req.query.schoolName) {
    try {
      const data = await CheckIns.getCurrentSchoolClasses(
        req.query.schoolName as string,
        req.query?.allWeek ? JSON.parse(req.query.allWeek as string) : false,
      );
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'GET' && req.query.currentSchool) {
    try {
      const data = await CheckIns.getCurrentSchool(
        req.query.username as string,
      );
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      const data = await CheckIns.getSchoolsListing(
        req.query.searchQuery as string,
      );
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const detectedIp = requestIp.getClientIp(req);
      const data = await CheckIns.createCheckIn({
        classId: req.body.classId,
        username: req.body.username,
        ipAddress: detectedIp,
      });
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: 'Server Error' });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default CheckIn;
