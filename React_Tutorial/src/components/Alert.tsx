
import { ReactNode, useState } from "react";
interface Props {
  children: ReactNode;
}
const Alert = ({ children }: Props) => {
  const [AlertShow, CloseAlert] = useState(true);
  return (
    <>
      {AlertShow && (
        <div className="alert alert-primary alert-dismissible">
          {children}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => CloseAlert(false)}
          ></button>
        </div>
      )}
    </>
  );
};

export default Alert;
