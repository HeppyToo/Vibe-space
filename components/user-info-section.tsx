interface UserInfoSectionProps {
  name: string;
  value: string;
}

export const UserInfoSection = ({ name, value }: UserInfoSectionProps) => {
  return (
    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm border-slate-600">
      <p className="text-sm font-medium">{name}</p>
      <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-gray-900 rounded-md">
        {value}
      </p>
    </div>
  );
};
