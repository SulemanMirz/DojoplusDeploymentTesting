export interface ExternalVideo {
  fighterNameOwner: string | null | undefined;
  videoTitle: string | null | undefined;
  videoCover: { url: string }[] | null | undefined;
  platform: string | null | undefined;
  imageUrl: string | null | undefined;
  videoUrlProfilePage: string | null | undefined;
  displayNameFromAllProfiles: string[] | null | undefined;
}

export interface YoutubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
  };
}
