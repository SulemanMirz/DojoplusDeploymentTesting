import type { NextApiRequest, NextApiResponse } from 'next';
import TimetableService from '../../../../services/TimetableService';
// import _ from 'lodash';

/**
 * @description - get Profile after send page to browser.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return user profile basic data like username and avatar.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function SchoolSlug(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const data = await TimetableService.getSchoolsSlug(
        req.query.slug as string,
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

export default SchoolSlug;