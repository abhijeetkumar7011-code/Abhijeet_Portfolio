type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default function CardWrapper({ children, className = "", style }: Props) {
  return (
    <div className={`card ${className}`} style={{ padding: "28px", ...style }}>
      {children}
    </div>
  );
}
