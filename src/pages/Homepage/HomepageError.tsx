/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { useRouteError } from "react-router-dom";

export default function HomepageError() {
  const error = useRouteError() as any;

  // if (isRouteErrorResponse(error) && error.status === 401) {
  // the response json is automatically parsed to
  // `error.data`, you also have access to the status
  return (
    <div>
      <h1></h1>
      <h2></h2>
      <p>
        Go ahead and email {JSON.stringify(error)} if you feel like this is
        a mistake.
      </p>
    </div>
  );
}
