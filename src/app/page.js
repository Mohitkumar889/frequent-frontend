import RegistrationForm from "../components/registartionForm/RegistrationForm";

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <RegistrationForm />
    </>
  );
}
