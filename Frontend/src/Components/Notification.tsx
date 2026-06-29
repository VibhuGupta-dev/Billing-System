import { useSelector } from "react-redux";

type RootState = {
  Notification?: {
    data?: string;
  };
};

export function Notification() {
  const notification = useSelector((store: RootState) => store.Notification?.data ?? "");

  if (!notification) return null;

  return (
    <div className="max-w-[220px] truncate rounded-full border border-zinc-700/70 bg-amber-50/95 px-4 py-2 text-sm font-semibold text-black shadow-lg backdrop-blur-sm">
      {notification}
    </div>
  );
}

export default Notification;
