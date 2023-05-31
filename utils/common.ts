import { useEffect, useState } from "react";

interface HookResponse<U> {
  isResolved: boolean;
  result: U | null;
}

function useCallAsyncFunc<U>(
  asyncFunc: () => Promise<U | null>
): HookResponse<U> {
  const [result, setResult] = useState<U | null>(null);
  const [isResolved, setIsResolved] = useState<boolean>(false);
  useEffect(() => {
    const inner_func = async () => {
      const result = await asyncFunc();
      setResult(result);
      setIsResolved(true);
    };
    inner_func();
  }, []);

  return { isResolved, result };
}
