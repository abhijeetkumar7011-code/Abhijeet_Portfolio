type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default function CardWrapper({ children, className = "", style }: Props) {
  return (
    <>
      <style>{`
        /* Responsive Card Base Padding */
        .portfolio-card-base {
          padding: 16px; /* Mobile standard padding */
        }
        
        @media (min-width: 768px) {
          .portfolio-card-base {
            padding: 28px; /* Desktop original padding */
          }
        }
      `}</style>

      <div 
        className={`card portfolio-card-base ${className}`} 
        style={{ ...style }}
      >
        {children}
      </div>
    </>
  );
}