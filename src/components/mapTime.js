const mapTime = (timestamp) => {
  const seconds = Math.floor((new Date() - timestamp * 1000) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return `${interval} ${interval === 1 ? 'year' : 'years'}`;
  }
  interval = Math.floor(seconds / 2592000);

  if (interval >= 1) {
    return `${interval} ${interval === 1 ? 'month' : 'months'}`;
  }
  interval = Math.floor(seconds / 86400);

  if (interval >= 1) {
    return `${interval} ${interval === 1 ? 'day' : 'days'}`;
  }
  interval = Math.floor(seconds / 3600);

  if (interval >= 1) {
    return `${interval} ${interval === 1 ? 'hour' : 'hours'}`;
  }
  interval = Math.floor(seconds / 60);

  if (interval >= 1) {
    return `${interval} ${interval === 1 ? 'minute' : 'minutes'}`;
  }

  return `${Math.floor(seconds)} ${Math.floor(seconds) === 1 ? 'second' : 'seconds'}`;
};

export default mapTime;
