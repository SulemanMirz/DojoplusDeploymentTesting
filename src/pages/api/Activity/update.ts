import type { NextApiRequest, NextApiResponse } from 'next';
import CheckIns from '../../../../services/CheckIns';

/**
 * @description - Update a recor in AllCheckIns table.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return the record that is updated.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function ActivityNotes(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await CheckIns.updateCheckIn(req.body);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(504).json({ message: 'Could not update CheckIn Record' });
  }
}

export default ActivityNotes;
