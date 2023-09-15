
const getSeasonYear = () => {
    const d = new Date();
    d.setMonth(d.getMonth()-3);
    return d.getFullYear();
  }

export { getSeasonYear };