/* eslint-disable class-methods-use-this */
import axios from 'axios';
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_CLOUD_UNSIGNED_PRESET,
} from './config';

class CloudinaryService {
  /**
   * @description - Get URLS after uploading images.
   * @param e - E.
   * @returns - Return URLS.
   */

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async upload(e) {
    try {
      const urls = [];
      const form = e.currentTarget;

      const formData = new FormData();
      formData.append('upload_preset', CLOUDINARY_CLOUD_UNSIGNED_PRESET);

      // eslint-disable-next-line no-restricted-syntax
      for (const file of form.files) {
        formData.append('file', file);
        // eslint-disable-next-line no-await-in-loop
        const data = await axios(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
          {
            method: 'POST',
            data: formData,
          },
        );
        urls.push({ url: data.data.secure_url, type: data.data.resource_type });
      }
      return urls;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new CloudinaryService();
