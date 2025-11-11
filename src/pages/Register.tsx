import AuthForm from "../components/auth/AuthForm";
import { useRegister } from "../hooks/useRegister";
import AuthLayout from "../layouts/AuthLayout";

function Register() {
  const { data, onSubmit, loading } = useRegister();

  return (
    <AuthLayout>
      <AuthForm
        isLoading={loading}
        type="register"
        data={data}
        onSubmit={onSubmit}
      />
    </AuthLayout>
  );
}

export default Register;
