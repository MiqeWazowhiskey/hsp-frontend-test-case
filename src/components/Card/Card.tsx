interface CardProps {
    children: React.ReactNode;
    title: string;
    className?: string;
}
export const Card: React.FC<CardProps> = ({ children, title, className }) => {
    return (
        <div className={`bg-white rounded-lg shadow-lg p-5 ${className}`}>
            <div className='text-2xl font-bold'>{title}</div>
            <div className='mt-5'>
                {children}
            </div>
        </div>
    );
}