import { redirect } from 'next/navigation';

export default function PatientPage() {
  // Redirect to onboarding by default
  redirect('/patient/onboarding');
}
