import { useEffect, useState } from 'react';

const useInterval = (callback: () => void, intervalMilliseconds: number) => {
  const [token, setToken] = useState<NodeJS.Timer>();

  const activateRefreshInterval = () => {
    callback();

    const intervalToken = setInterval(callback, intervalMilliseconds);
    setToken(intervalToken);

    return () => clearInterval(token);
  };

  useEffect(activateRefreshInterval, []);
};

export { useInterval };
