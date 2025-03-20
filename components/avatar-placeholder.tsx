interface AvatarPlaceholderProps {
  initials: string
  color?: string
  size?: number
  className?: string
}

export function AvatarPlaceholder({ initials, color = "#8b5cf6", size = 40, className = "" }: AvatarPlaceholderProps) {
  return (
    <div
      className={`flex items-center justify-center text-white font-bold rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
      }}
    >
      {initials}
    </div>
  )
}

