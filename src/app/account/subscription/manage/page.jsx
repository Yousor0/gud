import Button from '../../../../components/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function Manage() {
  const tiers = [
    {
      tierName: 'Free',
      cost: 0,
      description: [
        'Beginner-friendly workout guides',
        'Follow-along home workout videos',
        'General nutrition guides and healthy recipe ideas',
        'Educational content on fitness and wellness',
      ],
    },
    {
      tierName: 'Premium',
      cost: 30,
      description: [
        'Everything in Free Plan Included',
        'Beginner-friendly workout guides',
        'Follow-along home workout videos',
        'General nutrition guides and healthy recipe ideas',
        'Educational content on fitness and wellness',
      ],
    },
  ];

  return (
    <section className="mx-auto flex w-auto max-w-7xl flex-col gap-10 px-5 pt-20">
      <h1 className="page-title text-center">Manage Subscription</h1>
      <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:items-stretch">
        {tiers.map((tier) => (
          <div
            key={tier.tierNumber}
            className="flex flex-col rounded-lg border px-5 py-10 align-middle"
          >
            <div className="mt-5 mb-3 flex items-center justify-between">
              <h2 className="section-title">{tier.tierName}</h2>
              <p className="text-2xl text-gray-600">${tier.cost}/month</p>
            </div>

            <div className="border border-gray-600/30"></div>

            <ul className="mt-2 mb-5 flex-1 list-inside list-none">
              {tier.description.map((item, index) => (
                <li key={index} className="n my-5">
                  <FontAwesomeIcon icon={faCheck} /> {item}
                </li>
              ))}
            </ul>

            <Button text="Select" className="block w-full text-center" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Manage;
