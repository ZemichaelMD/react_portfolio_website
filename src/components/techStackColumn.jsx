import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function TechStackColumn({icons, text, ...props}) {
  return (
    <div className="group flex flex-col items-center w-32 justify-center hover:bg-green-200" {...props}>
      {icons.map(icon => (
        <FontAwesomeIcon icon={icon} size="3x" />
      ))}
      <p className="text-center text-sm text-green-800 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {text}
      </p>
    </div>
  )
}
