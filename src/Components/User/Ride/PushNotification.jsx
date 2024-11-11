import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserAuth } from "../../../Context/UserAuthContext";
import axios from "axios";
import { motion } from "framer-motion";
import { MdOutlineNotificationsActive } from "react-icons/md";
function PushNotification() {
  const PositionRightXOpacity = {
    hidden: { opacity: 0, x: 150 },
    visible: { opacity: 1, x: 0 },
  };
  const [NotificationList, SetNotificationList] = useState();

  const [UpdateNotification, SetUpdateNotification] = useState();
  const [LatestNotificationIndex, SetLatestNotificationIndex] = useState();
  const { id } = useParams();
  const { user } = useUserAuth();
  const Navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:8000/RideNotification`).then((response) => {
      SetNotificationList(
        response.data
          .filter((e) => e.UserUID == user.uid && e.Status == "Unread")
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      );
      //  SetLatestNotificationIndex(NotificationList && NotificationList[0]);
    });
  }, [NotificationList]);
  const ConfirmRide = async (notification) => {
    notification.Status = "Read";
    axios
      .put(
        `http://localhost:8000/RideNotification/${notification.id}`,
        notification
      )
      .then((response) => {
        // console.log(response.data);
        Navigate(`/confirm-journey/${notification.RideID}`);
      });
    // });
  };

  return (
    <>
      <ul className="absolute z-10 right-[1vw]">
        {NotificationList &&
          NotificationList &&
          NotificationList.map((notification, index) => (
            <li
              key={index}
              className="bg-[#ffee6f] w-64 mt-5 p-5 cursor-pointer rounded-lg ms-2 shadow-2xl"
              onClick={() => {
                ConfirmRide(notification);
              }}
            >
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={PositionRightXOpacity}
                transition={{ duration: 0.5 }}
                className="flex space-x-2 items-center"
              >
                <div>
                  <MdOutlineNotificationsActive size={25}/>
                </div>
                <div>
                  You Have New Ride <span>{notification.RideStatus}</span>{" "}
                  Notification from {notification.UserName}
                </div>
              </motion.div>
            </li>
          ))}
      </ul>
      {/* {LatestNotificationIndex && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={PositionRightXOpacity}
          transition={{ duration: 0.5 }}
          className="bg-slate-100 w-64 mt-10 p-5 cursor-pointer rounded-lg ms-2 absolute z-10 right-[1vw] shadow-2xl"
          onClick={() => {
            ConfirmRide(
              LatestNotificationIndex.id,
              LatestNotificationIndex.RideID
            );
          }}
        >
          You Have New Ride Notification from{" "}
          {LatestNotificationIndex && LatestNotificationIndex.UserName}
        </motion.div>
      )} */}
    </>
  );
}

export default PushNotification;
