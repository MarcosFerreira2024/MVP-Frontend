export function getFirstPhotoUrl(photos: { url: string }[]): string {
  return photos[0]?.url || "/placeholder.jpg";
}
