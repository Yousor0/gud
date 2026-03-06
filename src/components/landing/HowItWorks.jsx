const steps = [
  {
    step: '1',
    title: 'Create Your Account',
    description:
      'Sign up for free and tell us about your fitness goals and experience level.',
  },
  {
    step: '2',
    title: 'Choose Your Plan',
    description:
      'Browse workouts and nutrition plans curated by certified professionals for your level.',
  },
  {
    step: '3',
    title: 'Start Your Journey',
    description:
      'Follow along from home, build consistency, and develop lasting healthy habits.',
  },
];

export default function HowItWorks() {
  return (
    <section>
      <h2 className="section-title mb-8 text-center">How It Works</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-4 text-center"
          >
            <div className="bg-brand-secondary flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold text-white">
              {step.step}
            </div>
            <h3 className="text-lg font-semibold">{step.title}</h3>
            <p className="text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
