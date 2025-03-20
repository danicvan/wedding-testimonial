interface SolidImageProps {
  width?: number
  height?: number
  color?: string
  text?: string
  className?: string
}

export function SolidImage({
  width = 300,
  height = 200,
  color = "#f43f5e",
  text = "Image",
  className = "",
}: SolidImageProps) {
  return (
    <div
      className={`flex items-center justify-center text-white font-bold ${className}`}
      style={{
        width: width,
        height: height,
        backgroundColor: color,
        borderRadius: "0.375rem",
      }}
    >
      {text}
    </div>
  )
}

