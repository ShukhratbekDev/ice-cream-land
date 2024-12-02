import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import StorySection from './_components/StorySection';
import TeamSection from './_components/TeamSection';
import Loading from './loading';

// Dynamically import the component with animations
const ResultsSection = dynamic(() => import('./_components/ResultsSection'), {
  loading: () => <Loading />,
  ssr: false, // Disable SSR for this component to avoid hydration issues
});

export default function AboutPage() {
  return (
    <main>
      <StorySection />
      <Suspense fallback={<Loading />}>
        <ResultsSection />
      </Suspense>
      <TeamSection />
    </main>
  );
}
