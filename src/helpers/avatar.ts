export function getAvatarUrl(name: string, photo?: string | null): string {
  if (photo) return photo;
  const index = ([...name].reduce((a, c) => a + c.charCodeAt(0), 0) % 9) + 1;
  return `/avatars/${index}.png`;
}
