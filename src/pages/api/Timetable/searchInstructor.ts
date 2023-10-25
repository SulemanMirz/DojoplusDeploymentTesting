import type { NextApiRequest, NextApiResponse } from 'next';
// import _ from 'lodash';
import TimetableService from '../../../../services/TimetableService';

/**
 * @description - get Profile after send page to browser.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return user profile basic data like username and avatar.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function searchInstructor(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET' && req.query.instructors) {
    try {
      const data = await TimetableService.getMastersBySearchTimeTable(
        req.query.searchQuery as string,
      );
      res.send(data);
    } catch (error) {
      res.status(504).json({ message: 'Server Error' });
    }
  } else {
    // Handle any other HTTP method
  }
}

export default searchInstructor;
