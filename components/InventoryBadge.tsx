import type { InventoryStatus } from '@/types';

interface InventoryBadgeProps {
  status: InventoryStatus;
}

export default function InventoryBadge({ status }: InventoryBadgeProps) {
  const config: Record<InventoryStatus, { bg: string; text: string; dot: string }> = {
    'In Stock': { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
    'Low Stock': { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
    'Out of Stock': { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
  };

  const style = config[status];

  if (!style) return null;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      {status}
    </span>
  );
}