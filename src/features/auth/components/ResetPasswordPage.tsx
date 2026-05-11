import { Suspense } from "react";
import AuthCenterShell from "./AuthCenterShell";
import ResetPasswordForm from "./ResetPasswordForm";

function ResetFormFallback() {
  return (
    <div className="flex min-h-[220px] items-center justify-center px-8 py-14 text-sm text-zinc-500 dark:text-zinc-400">
      Loading…
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <AuthCenterShell>
      <Suspense fallback={<ResetFormFallback />}>
        <ResetPasswordForm />
      </Suspense>
    </AuthCenterShell>
  );
}
