import { AiFillSetting, AiOutlineSetting } from "react-icons/ai";
import { BsChatLeftText, BsFillChatLeftTextFill, BsShieldExclamation, BsShieldFillExclamation } from "react-icons/bs";
import { HiOutlineUsers, HiUsers } from "react-icons/hi";
import Chat from "../Chat/Chat"

const Tabs = [
    {
        id: 0,
        key: "empty",
        icon: <div>@</div>,
        activeIcon: <div>#</div>,
        component: <div>empty</div>,
    },
    {
        id: 1,
        key: "users",
        icon: <HiOutlineUsers style={{fontSize: "1.25rem", opacity: "0.5"}} />,
        activeIcon: <HiUsers style={{fontSize: "1.25rem"}} />,
        component: <div>Users</div>,
    },
    {
        id: 2,
        key: "chat",
        icon: <BsChatLeftText style={{fontSize: "1.25rem", opacity: "0.5"}} />,
        activeIcon: <BsFillChatLeftTextFill style={{fontSize: "1.25rem"}} />,
        component: <Chat />,
    },
    {
        id: 3,
        key: "settings",
        icon: <AiOutlineSetting style={{fontSize: "1.25rem", opacity: "0.5"}} />,
        activeIcon: <AiFillSetting style={{fontSize: "1.25rem"}} />,
        component: <div>Settings</div>,
    },
    {
        id: 4,
        key: "rules",
        icon: <BsShieldExclamation style={{fontSize: "1.25rem", opacity: "0.5"}} />,
        activeIcon: <BsShieldFillExclamation style={{fontSize: "1.25rem"}} />,
        component: <div>Rules</div>,
    },
];

export default Tabs;