interface CardProps {
    children: React.ReactNode;
    title: string;
    className?: string;
}
export const Card: React.FC<CardProps> = ({ children, title, className }) => {
    return (
        <div className={`bg-white rounded-lg shadow-lg p-3 ${className}`}>
            <div className='text-xl text-[#164E63] font-bold text-center'>{title}</div>
            <div className='mt-5'>
                {children}
            </div>
        </div>
    );
}