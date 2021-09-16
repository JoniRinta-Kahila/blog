const TimeAgo = (timestamp: number): string => {
  const ts = timestamp / 1000; // convert ts to seconds

  const current = new Date(); // current time
  const now = Math.floor(current.getTime()/1000) // ts in seconds
  const secElapsed = now - ts

  // days
  if (secElapsed > 2*24*3600)
    return `${Math.floor(((secElapsed / 60) / 60) / 24)} days ago`;
  
  // yesterday
  if (secElapsed > 24 * 3600)
    return 'yesterday';

  // hours
  if (secElapsed > 3600)
    return `${Math.floor((secElapsed / 60) / 60)} hour ago`;
  
  // minutes
  if (secElapsed > 60)
    return `${Math.floor(secElapsed / 60)} minutes ago`;

  // under minute
  return 'now'
}

export default TimeAgo;