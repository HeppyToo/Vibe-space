interface ContainerProps {
    children: React.ReactNode;
}

export const Container = ({children}: ContainerProps) => {
    return <div className="h-full">
        {children}
    </div>
}