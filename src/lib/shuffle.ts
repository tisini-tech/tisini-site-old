export default function shuffleItems<T = unknown>(items: Array<T>): T[] {
  return items.sort(() => Math.random() - 0.5);
}
