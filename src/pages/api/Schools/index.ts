import type { NextApiRequest, NextApiResponse } from 'next';
import SchoolsService from '../../../../services/SchoolService';

/**
 * @description - get seminars data against a specific user.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return seminars data against a specific user.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function Schools(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET' && req.query.lat) {
    try {
      const data = await SchoolsService.getNearestSchools(
        req.query.lat,
        req.query.long,
      );
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      const data = await SchoolsService.getAccessibleSchools(
        typeof req.query.username === 'string'
          ? req.query.username
          : req.query?.username[0],
      );

      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: 'Server Error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const data = await SchoolsService.updateSchoolLogo(req.body.data);

      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(504).json({ message: 'Server Error' });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default Schools;
