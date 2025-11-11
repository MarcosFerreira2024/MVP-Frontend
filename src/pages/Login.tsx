import AuthForm from "../components/auth/AuthForm";
import CodeVerificationModal from "../components/auth/CodeVerificationModal";
import { useLogin } from "../hooks/useLogin";
import AuthLayout from "../layouts/AuthLayout";

function Login() {
  const { data, onSubmit, loading } = useLogin();

  return (
    <AuthLayout>
      <CodeVerificationModal />
      <AuthForm
        isLoading={loading}
        type="login"
        data={data}
        onSubmit={onSubmit}
      />
    </AuthLayout>
  );
}

export default Login;
