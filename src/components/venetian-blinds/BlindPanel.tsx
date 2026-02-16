interface BlindPanelProps {
  height: number;
}

export default function BlindPanel({ height }: BlindPanelProps) {
  return (
    <div
      className="w-full shrink-0"
      style={{ height, backgroundColor: '#0a0a0a' }}
    />
  );
}
