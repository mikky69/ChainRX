import { redirect } from 'next/navigation';

export default function PharmacistPage() {
  // Redirect to onboarding by default
  redirect('/pharmacist/onboarding');
}
