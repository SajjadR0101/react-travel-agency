import React, { memo } from "react";
import ImageCover from "../ImageCover/ImageCover";

export default memo(function UserProfile({ src, username, className = '' }) {
    return <>{src ? <ImageCover src={src} alt="user-profile" wrapperClassName={`w-16 h-16 shrink-0 rounded-full overflow-hidden border-2 border-blue-500 ${className}`} /> : <div className={`w-16 h-16 shrink-0 rounded-full overflow-hidden bg-primary text-white font-MontserratMedium text-4xl flex-center ${className}`}>{username && username[0].toUpperCase() || 'M'}</div>}</>;
})
