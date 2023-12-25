import React, { useEffect, useState } from "react";
import UserProfile from "../../../components/UserProfile/UserProfile";
import ActiveDot from "../components/ActiveDot";
import TextByIcon from "../../../components/TextByIcon/TextByIcon";

const SearchByButton = ({ value, title, onClick, active }) => {
    return (
        <button className={`py-1.5 px-2 rounded ${active ? "bg-blue-500 text-white" : "bg-slate-100 hover:bg-slate-200/70"}`} data-value={value} onClick={onClick}>
            {title}
        </button>
    );
};

const searchByItems = [
    { value: "username", title: "Username" },
    { value: "email", title: "Email" },
    { value: "phone", title: "Phone" },
];

export default function SerachUsers({ users, onSelectUser }) {
    const [serachValue, setSearchValue] = useState("");
    const [serachBy, setSerachBy] = useState("username");
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [showUsersBox, setShowUsersBox] = useState(false);

    useEffect(() => {
        setFilteredUsers(users)
        setSearchValue('')
    }, [users])

    useEffect(() => {
        switch (serachBy) {
            case "username":
                setFilteredUsers([...users].filter((user) => user.username.toLowerCase().includes(serachValue)));
                break;

            case "email":
                setFilteredUsers([...users].filter((user) => user.email.includes(serachValue)));
                break;

            case "phone":
                setFilteredUsers([...users].filter((user) => user.phone.includes(serachValue)));
                break;

            default:
                setFilteredUsers([...users]);
        }
    }, [serachValue]);

    const changeSearchBy = (event) => {
        setSerachBy(event.currentTarget.dataset.value);
    };

    const onSlectUserItem = (user) => {
        onSelectUser({ userInfo: user })
    }

    return (
        <div className="mb-8 relative z-20">
            <div className="flex items-center gap-x-4">
                <div>
                    <input type="text" placeholder="Serach in users" value={serachValue} onChange={(e) => setSearchValue(e.target.value)} className="peer w-96 p-3 h-12 rounded-lg text-sm bg-white outline-none border border-slate-300 text-slate-600" onFocus={() => setShowUsersBox(true)} onBlur={() => setShowUsersBox(false)} />
                    <div className={`search-user-box absolute top-full mt-2 w-96 h-64 bg-white py-2 rounded-lg border border-slate-300 overflow-auto transition-all origin-top ${showUsersBox ? "visible opacity-100" : "invisible opacity-0"}`}>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => {
                                let activeUser = Math.random() > 0.5;
                                return (
                                    <div className="py-2 px-4 flex items-center gap-x-4 transition-all hover:bg-slate-50" onClick={() => onSlectUserItem(user)}>
                                        <UserProfile src={user?.profile} username={user?.username} />
                                        <div className="text-sm text-slate-600 flex flex-col gap-y-3">
                                            <span className="font-MontserratMedium line-clamp-1">{user[serachBy]}</span>
                                            <div className="flex items-center gap-x-2 text-xs">
                                                <ActiveDot active={activeUser} />
                                                <span>{activeUser ? "Online" : "Offline"}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="flex-center absolute inset-0">
                                <TextByIcon text='There is no data to display' className='flex flex-col items-center font-MontserratMedium gap-y-2 text-slate-500/70' iconID='face' iconClasses='w-20 h-20' />
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-x-4 text-xs text-slate-600 child:transition-all">
                    <span className="">Serach By</span>
                    {searchByItems.map((item) => (
                        <SearchByButton key={item.value} {...item} active={item.value === serachBy} onClick={changeSearchBy} />
                    ))}
                </div>
            </div>
        </div>
    );
}
