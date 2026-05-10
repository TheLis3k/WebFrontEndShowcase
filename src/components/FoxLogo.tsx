export default function FoxLogo() {
  return (
    <svg viewBox="0 0 200 200" className="w-32 h-32 md:w-48 md:h-48 drop-shadow-[0_0_15px_rgba(220,133,31,0.3)]">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="#DC851F"
        d="
          M 90,178 Q 70,135 15,115 Q 30,95 35,80 Q 40,40 45,15
          Q 75,55 100,75 Q 125,55 155,15
          Q 160,40 165,80 Q 170,95 185,115
          Q 130,135 110,178 Q 100,186 90,178 Z

          M 50,40 Q 65,65 75,80 Q 55,85 45,80 Q 42,60 50,40 Z
          M 150,40 Q 135,65 125,80 Q 145,85 155,80 Q 158,60 150,40 Z

          M 82,110 L 65,97 L 50,105 L 65,108 Z
          M 118,110 L 135,97 L 150,105 L 135,108 Z
        "
      />
    </svg>
  )
}
