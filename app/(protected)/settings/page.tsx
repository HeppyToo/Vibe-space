import { auth } from "@/auth";

const SettingsPage = async () => {
    const session = await auth()
    return (
        <div>
            Settings Page
        </div>
    );
};

export default SettingsPage;