"use client"

import {logout} from "@/action/logout";
import { useCurrentUser } from "@/hooks/use-carrent-user";

const onClick = () => {
    logout()
}

const SettingsPage = () => {
    return (
        <div className='flex justify-center p-10 rounded-xl bg-white w-[600px]'>
            <form>
                <button onClick={onClick} type='submit' className="text-black">
                    Sign Out
                </button>
            </form>
        </div>
    );
};

export default SettingsPage;