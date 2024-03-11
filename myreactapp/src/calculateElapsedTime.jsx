const calculateElapsedTime = (created_at) => {
  const now = new Date();
  const createdAtDate = new Date(created_at);
  const secondsDifference = Math.floor((now - createdAtDate) / 1000);

  if (secondsDifference < 60) {
    return `${secondsDifference} seconds ago`;
      } else if (secondsDifference < 3600) {
        const minutes = Math.floor(secondsDifference / 60);
        return `${minutes} minutes ago`;
      } else if (secondsDifference < 86400) {
        const hours = Math.floor(secondsDifference / 3600);
        return `${hours} hours ago`;
      } else {
        return createdAtDate.toLocaleDateString();
      }
  };


export default calculateElapsedTime;