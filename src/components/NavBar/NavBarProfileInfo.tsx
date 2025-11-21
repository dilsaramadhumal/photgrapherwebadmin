import NotificatonButton from "../CustomBtn/NotificationButton";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { NotificationPanel } from "../notifications/NotificationPanel";

const NavBarProfileInfo = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotifications();

  const handleLogout = () => {
    console.log("Logout clicked");
    // space to Add logout logic here
    navigate('/login');
  };

  return (
    <>
    <div className="flex items-center gap-3">
      <NotificatonButton 
        onClick={() => setShowNotifications(!showNotifications)} 
        showBadge={unreadCount > 0} 
        badgeVariant="dot"
        size="icon"
        className="hover:scale-105 transition-transform duration-75"
        style={{ color: 'var(--accent-color, #FFC964)' }}
      />
      
      <button
        onClick={toggleTheme}
        className="flex items-center gap-2 px-3 py-2 hover:scale-105 transition-transform duration-75"
        style={{ color: 'var(--accent-color, #FFC964)' }}
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-3 py-2 hover:scale-105 transition-transform duration-75"
        style={{ color: 'var(--accent-color, #FFC964)' }}
      >
        <LogOut size={20} />
        <span className="text-sm font-medium">Logout</span>
      </button>
    </div>
    
    {showNotifications && (
      <NotificationPanel
        notifications={notifications}
        onClose={() => setShowNotifications(false)}
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={markAllAsRead}
        onDelete={deleteNotification}
      />
    )}
    </>
  );
};

export default NavBarProfileInfo;