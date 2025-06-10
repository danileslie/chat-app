import { X } from "lucide-react";
import authStore from "../store/authStore";
import messageStore from "../store/messageStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = messageStore();
  const { onlineUsers } = authStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* avatar */}
          <div>
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.userName}
              />
            </div>
          </div>

          {/* user info */}
          <div>
            <h3 className="font-medium">{selectedUser.userName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* close */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
