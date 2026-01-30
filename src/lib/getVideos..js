import videos from '../data/videos';
import users from '../data/users';

export function getVideos({ userID }) {
  return videos.filter((v) => !userID || v.userID === userID);
}

export function getUser({ video }) {
  return video.userId;
}
