export const fetchFlowers = async () => {
  const response = await fetch('../database.json')
  const result = await response.json()
  return result.flowers
}
