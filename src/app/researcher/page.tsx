import { redirect } from 'next/navigation';

export default function ResearcherPage() {
  // Redirect to onboarding by default
  redirect('/researcher/onboarding');
}
