function useOpenStatus(closeTime: string, openTime: string) {
  function timeToMinutes(time: string) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = timeToMinutes(openTime);
  const closeMinutes = timeToMinutes(closeTime);

  let isOpen: boolean;

  if (openMinutes <= closeMinutes) {
    isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;
  } else {
    isOpen = currentMinutes >= openMinutes || currentMinutes < closeMinutes;
  }

  return { isOpen };
}

export default useOpenStatus;
