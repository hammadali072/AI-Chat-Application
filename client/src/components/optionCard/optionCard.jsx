import clsx from 'clsx';
import { ArrowRightIcon } from '@phosphor-icons/react';

const OptionCard = ({ icon: Icon, title, description, badge, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'card-inset relative flex cursor-pointer flex-col justify-between rounded-2xl p-6 duration-150',
        isActive
          ? 'ring-2 ring-primary ring-offset-2'
          : 'hover:-translate-y-0.5 hover:border-black/15'
      )}
    >
      <div>
        {/* Top header row with icon and optional badge */}
        <div className="flex items-center justify-between">
          <div className="flex size-12 items-center justify-center rounded-xl bg-tint-gray text-primary">
            {Icon && <Icon size={24} weight="bold" />}
          </div>
          {badge && (
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {badge}
            </span>
          )}
        </div>

        {/* Title and Description */}
        <h3 className="mt-4 text-lg font-bold text-black">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-grey">{description}</p>
      </div>

      {/* Footer CTA link */}
      <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary">
        <span>Select Option</span>
        <ArrowRightIcon size={16} weight="bold" />
      </div>
    </div>
  );
};

export default OptionCard;
