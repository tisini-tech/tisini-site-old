export type UserProfileType = {
  id: string;
  nickname: string;
  phone_number: string;
  email: string;
  first_name: string;
  last_name: string | null;
  quiz_players: {
    id: number;
    profile_pic: null | string;
  };
};
