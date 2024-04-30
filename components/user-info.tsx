import {ExtendedUser} from "@/next-auth";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {UserInfoSection} from "@/components/user-info-section";
import {Badge} from "@/components/ui/badge";

interface UserInfoProps {
    user?: ExtendedUser,
    label: string;
}

export const UserInfo = ({user, label}: UserInfoProps) => {
    return (
        <Card className="w-[600px] shadow-md cursor-auto bg-black border-slate-800/40 text-white bg-black border-slate-800/40 text-white">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    {label}
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <UserInfoSection name="Id" value={user?.id || "N/A"}/>
                <UserInfoSection name="Name" value={user?.name || "N/A"}/>
                <UserInfoSection name="Email" value={user?.email || "N/A"}/>
                <UserInfoSection name="Role" value={user?.role || "N/A"}/>

                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm border-slate-600">
                    <p className="text-sm font-medium">
                        Two Factor Authentication
                    </p>
                    <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
                        {user?.isTwoFactorEnabled ? "ON" : "OFF" || "N/A"}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    )
}