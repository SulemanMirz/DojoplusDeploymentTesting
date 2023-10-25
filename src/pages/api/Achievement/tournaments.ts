import type { NextApiRequest, NextApiResponse } from 'next';
import AchievementService from '../../../../services/AchievementService';

/**
 * @description - get Profile after send page to browser.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return user profile basic data like username and avatar.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
async function TournamentsInAchievement(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      const data = await AchievementService.getTournaments(
        req.query.martialArt as string,
        req.query.searchQuery as string,
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

export default TournamentsInAchievement;
