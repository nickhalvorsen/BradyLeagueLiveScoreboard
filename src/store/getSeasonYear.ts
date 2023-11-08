// Get the current NFL season year
// For example, the 2023 NFL season runs from Sep 2023–Jan 2024, 
// so during this period of time, the function returns "2023"
const getSeasonYear = () => {
    const d = new Date();
    d.setMonth(d.getMonth()-3);
    return d.getFullYear();
  }

export { getSeasonYear };