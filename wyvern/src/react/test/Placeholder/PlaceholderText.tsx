import "./PlaceholderText.css";

export default function PlaceholderText({ children, isActive}: { children: React.ReactNode, isActive: boolean }) {
  if (!isActive) {
    return <div>
      {children}
    </div>
  } else {
    return <div></div>
  }
}
