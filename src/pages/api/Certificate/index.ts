import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import RanksService from '../../../../services/RanksService';

/**
 * @description - get check-in details for a specific user.
 * @param req - Req.
 * @param res - Res.
 * @returns - Return check-in details for a specific user.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
async function Certificate(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const data = {
      url: req?.query?.url,
      width: '830',
      height: '570',
      selector: '#main-certificate-div',
      liveLinkNeededForImage: 'true',
    };

    const apiUrl =
      'https://webpage-screenshot-api-git-main-aminrafaey.vercel.app/api/';

    try {
      const certificateData = await axios.post(apiUrl, data);
      const userCertificate = await RanksService.uploadCertificate(
        req.query.id as string,
        certificateData.data.url as string,
      );
      res.send(userCertificate);
    } catch (error) {
      console.error('Error making API call:', error.message);
    }
  }
}

export default Certificate;
