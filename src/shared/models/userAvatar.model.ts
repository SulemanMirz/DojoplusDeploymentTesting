import { AirtableImage } from './AirtableImage';
import { IRank } from './Rank.model';

export interface UserAvatarProps {
  id: string;
  photo: AirtableImage[] | undefined | null;
  ranks: IRank[] | undefined | null;
  username: string;
}
