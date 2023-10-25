export interface INews {
  id: string;
  headline: string | null | undefined;
  subtitle: string | null | undefined;
  published: string | null | undefined;
  author: string | null | undefined;
  featured: boolean | null | undefined;
  link: string | null | undefined;
  cover:
    | [
        {
          url: string | null | undefined;
        },
      ]
    | null
    | undefined;
  channel: {
    channel: string | null | undefined;
    logo:
      | [
          {
            url: string | null | undefined;
          },
        ]
      | null
      | undefined;
  };
}
