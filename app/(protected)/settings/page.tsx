"use client"

import {logout} from "@/action/logout";
import { useCurrentUser } from "@/hooks/use-carrent-user";

const onClick = () => {
    logout()
}

const SettingsPage = () => {
    const user = useCurrentUser()
    return (
        <div className='text-white p-10 rounded-xl bg-white'>
            {JSON.stringify(user)}
            <form>
                <button onClick={onClick} type='submit'>
                    Sign Out
                </button>
            </form>
        </div>
    );
};

export default SettingsPage;