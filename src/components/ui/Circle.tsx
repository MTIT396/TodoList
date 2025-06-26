export default function Circle({ color }: { color: string }) {
  return (
    <div
      className="w-4 h-4 rounded-full"
      style={{ backgroundColor: color }}
    ></div>
  );
}
