import { useEffect, useRef, useState } from "react";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

import type { PropsWithoutRef, DetailedHTMLProps, InputHTMLAttributes } from "react";

type Props = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "value" | "onChange"
> & {
  value: string;
  onChange: (value: string) => void;
};

/**
 * Enhance perfomance on onChange event of a controlled input
 */
export function EnhancedTextInput({ value, onChange, ...otherProps }: PropsWithoutRef<Props>) {
  const [_val, setVal] = useState(() => value);
  const subject = useRef(new Subject<string>()).current;

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    subject.next(e.target.value);
    setVal(e.target.value);
  };

  useEffect(() => {
    const subscription = subject.pipe(debounceTime(300)).subscribe(onChange);
    return () => subscription.unsubscribe();
  }, [subject, onChange]);

  return <input {...otherProps} value={_val} onChange={onInputChange} />;
}
