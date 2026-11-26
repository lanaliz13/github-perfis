// Formats large numbers in a short form.
// Expected examples: 842 -> "842" | 1500 -> "1.5k" | 15400 -> "15.4k" | 2300000 -> "2.3M"
export function formatNumber(value: number): string {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + "M";
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + "k";
  }
  return String(value);
}
