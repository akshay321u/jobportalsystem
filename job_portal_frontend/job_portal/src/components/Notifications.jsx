import { useEffect, useState } from "react";
import API from "../services/userService";

function Notifications() {

  const [notifications, setNotifications] = useState([]);

  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {

    try {

      const res = await API.get(
        `/notifications/${user.id}`
      );

      setNotifications(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">

      <h2>Notifications</h2>

      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        notifications.map((n) => (
          <div
            key={n.id}
            className="card"
            style={{
              marginBottom: "15px",
              background: n.readStatus
                ? "#fff"
                : "#eff6ff",
            }}
          >
            <p>{n.message}</p>

            <small>
              {new Date(n.createdAt)
                .toLocaleString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

export default Notifications;