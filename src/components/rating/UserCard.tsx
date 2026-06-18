import { timestampConverter } from "../../helpers/timestampConverter";

type UserCardProps = {
  userName: string;
  userPhoto?: string | undefined;
  data: string;
  ratingValue: number;
};

function UserCard({ userName, userPhoto, data, ratingValue }: UserCardProps) {
  const maxRating = 5;
  const rating = "★".repeat(ratingValue) + "☆".repeat(maxRating - ratingValue);

  const convertedData = timestampConverter(data);

  const avatarSrc =
    userPhoto ??
    `/avatars/${([...userName].reduce((a, c) => a + c.charCodeAt(0), 0) % 9) + 1}.png`;

  return (
    <div className="flex  gap-2 ">
      <img
        src={avatarSrc}
        alt={userName}
        className="w-full h-full border border-green-900 rounded-full max-w-[48px] max-h-[48px]"
      />
      <div className="flex flex-col font-segoe font-semibold">
        <h1 className="text-green-900 text-lg">{userName}</h1>
        <p className="text-sm text-gray-500">{convertedData}</p>
      </div>
      <p className="text-green-900 text-xl  ">{rating}</p>
    </div>
  );
}

export default UserCard;
